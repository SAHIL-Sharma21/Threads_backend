const queries = {};

const muations = {
    createUser: async(_:any, {}:{}) => {
        return "random id"
    }
};

export const resolvers = {queries, muations};