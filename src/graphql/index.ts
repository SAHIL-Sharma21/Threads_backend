//graphql server

import { ApolloServer } from "@apollo/server";
import { prisma } from "../db/db";


async function createGraphQlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                
            }
    
            type Mutation {
              
            }
    
        `,//schema
        resolvers: {
            Query :{},
            Mutation: {}
        }
    });
    
    await gqlServer.start();
    return gqlServer;
}

export default createGraphQlServer;