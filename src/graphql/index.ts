//graphql server
import { ApolloServer } from "@apollo/server";
import {User} from './user'
import { Post } from "./posts";


async function createGraphQlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `

            ${User.typeDefs}
            ${Post.typeDefs}
            type Query {
                ${User.Queries}
                ${Post.Queries}
            }
    
            type Mutation {
                ${User.mutations}
                ${Post.mutations}
            }
    
        `,//schema
        resolvers: {
            Query :{
                ...User.resolvers.queries,
                ...Post.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.muations,
                ...Post.resolvers.mutations
            }
        }
    });
    
    await gqlServer.start();
    return gqlServer;
}

export default createGraphQlServer;