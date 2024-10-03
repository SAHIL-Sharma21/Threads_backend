import {prisma} from '../db/db'

export interface PostPayload {
    title: string;
    content: string;
    authorEmail: string;
}

export interface UpdatePostPayload {
    postId: string;
    title?: string;
    content?: string;
}

class PostServices {
    //create post 
    public static async createPost(payload: PostPayload){
        try {
            const {title, content, authorEmail} = payload;

            if (!title || !content || !authorEmail){
                throw new Error('title, content and authorEmail are required');
            }

            const createdPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    author: {
                        connect: {
                            email: authorEmail  
                        }
                    }
                }
            });
            return createdPost;
        } catch (error:any) {
            throw new Error(`Error creating post: ${error.message}`);
        }
    }

    //get a post by post id
    public static async getPostById(postId: string){
        try {
            if(!postId){
                throw new Error('postId is required');
            }

            return prisma.post.findUnique({
                where:{
                    id: postId,
                }
            });
        } catch (error: any) {
            throw new Error(`Error getting post: ${error.message}`);
        }
    }

    //get all posts by a user
    public static async getPostsByUser(userId: string){
        try {
            if (!userId){
                throw new Error('userId is required');
            }

            return await prisma.post.findMany({
                where:{
                    authorId: userId,
                }
            });
        } catch (error: any) {
            throw new Error(`Error getting all posts by user: ${error.message}`);
        }
    }

    //update post
    public static async updatePost(payload: UpdatePostPayload){
        const {title, content, postId} = payload;

        try {
            return await prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    title,
                    content
                }
            });
        } catch (error:any) {
            throw new Error(`Error updating post: ${error.message}`);
        }
    }

    //delete a post
    public static async deletePost(postID: string){
        try {
            if(!postID){
                throw new Error('postId is required');
            }
            
            console.log(postID);
            
            return await prisma.post.delete({
                where: {
                    id: postID
                }
            });
        } catch (error:any) {
            throw new Error(`Error deleting post: ${error.message}`);
        }
    }

}

export default PostServices;