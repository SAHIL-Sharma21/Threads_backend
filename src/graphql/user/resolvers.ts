import UserService, {GetUserToken, UserPayload} from '../../services/userServices'

const queries = {
    getUserToken: async(_:any, payload:GetUserToken) => {
        const token = await UserService.getUserToken({
            email: payload.email,
            password: payload.password,
        })
        return token;
    },
    getCurrentLoggedInUser: async(_:any, para:any, context: any) => {
        if(context && context.user){
            const user = await UserService.getuserByID(context.user?.id);
            return user; 
        }
        throw new Error('You are not authenticated');
    }
};


const muations = {
    createUser: async(_:any, payload:UserPayload) => {
        const res = UserService.createUser(payload);
        return (await res).id;
    },
};

export const resolvers = {queries, muations};