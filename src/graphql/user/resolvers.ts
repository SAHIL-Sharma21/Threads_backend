import UserService, {GetUserToken, UserPayload} from '../../services/userServices'

const queries = {
    getUserToken: async(_:any, payload:GetUserToken) => {
        const token = await UserService.getUserToken({
            email: payload.email,
            password: payload.password,
        })
        return token;
    }
};


const muations = {
    createUser: async(_:any, payload:UserPayload) => {
        const res = UserService.createUser(payload);
        return (await res).id;
    },
};

export const resolvers = {queries, muations};