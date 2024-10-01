//graphql server

import { ApolloServer } from "@apollo/server";
import {User} from './user'


async function createGraphQlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                ${User.Queries}
            }
    
            type Mutation {
                ${User.mutations}
            }
    
        `,//schema
        resolvers: {
            Query :{
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.muations
            }
        }
    });
    
    await gqlServer.start();
    return gqlServer;
}

export default createGraphQlServer;