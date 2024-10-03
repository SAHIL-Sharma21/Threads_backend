export const Queries = `#grapghql
    getPost(postId: String!): Post
    getPostsByUser(userId: String!): [Post!]
`;