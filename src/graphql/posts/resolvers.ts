import PostServices, {PostPayload, UpdatePostPayload} from '../../services/postsServices'

const queries = {
    getPost: async(_:any, {postId}: {postId: string}) => {
        return await PostServices.getPostById(postId);
    },

    // getPostByUser: async (_:any, {userId}: {userId: string}) => {
    //     console.log(userId);
    //     return await PostServices.getPostsByUser(userId);
    // }

};

const mutations = {
    createPost: async(_: any, payload: PostPayload) => {
        const createdPost = await PostServices.createPost(payload);
        return createdPost;
    },

    updatePost: async(_:any, payload: UpdatePostPayload) => {
        const updatedPost  = await PostServices.updatePost(payload)
        return updatedPost;
    },

    deletePost: async(_:any, {postId}: {postId: string}) => {
        return await PostServices.deletePost(postId);
    }
};

export const resolvers = {queries, mutations}