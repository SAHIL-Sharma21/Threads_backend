export const typeDefs = `#graphql
    type Post{
        id: ID!
        title: String!
        content: String!
        author: User!
    }
`;