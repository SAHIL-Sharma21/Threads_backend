export const mutations = `
    createPost(title: String!, content: String!, authorEmail: String!): Post
    updatePost(postId: String!, title: String, content: String): Post
    deletePost(postId: String!): Post
`;