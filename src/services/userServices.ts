import { prisma } from "../db/db";
import {createHmac, randomBytes} from 'node:crypto'
import JWT from 'jsonwebtoken'


const JWT_SECRET= 'JWT_SECRET@@@';
export interface UserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

export interface GetUserToken{
    email: string;
    password: string;
}

class UserService {

    private static generateHash(salt: string, password: string){
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
        return hashedPassword;
    }

    public static createUser(payload: UserPayload){
        const {firstName, lastName, email, password} = payload;

        const salt = randomBytes(32).toString('hex');
       const hashedPassword = this.generateHash(salt, password);

        return prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword,
            }
        });
    }

    private static async getUserByEmail(email:string){
        return await prisma.user.findUnique({
            where:{
                email,
            }
        });
    }
    public static async getUserToken(payload: GetUserToken){
        const {email, password} = payload;

        if(!email || !password){
            throw new Error('email and password are required');
        }

        //cheking password is correct or not by finding the user
        const user = await this.getUserByEmail(email);

        if (!user){
            throw new Error('user not found');
        }

        const userSalt = user.salt;
        const userHashedPassword = UserService.generateHash(userSalt, password);
        
        if(userHashedPassword !== user.password){
            throw new Error('password is incorrect');
        }

        //generate a token
        const token = JWT.sign({
            id: user.id,
            email: user.email
        }, JWT_SECRET)

        return token;
    }
}

export default UserService;