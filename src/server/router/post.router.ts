import * as trpc from '@trpc/server'

import { createPostSchema, getPostSchema } from "../../schema/post.schema";
import { createPost, getAllPosts, getPost } from '../../services/post.service';
import { createRouter } from "../createRouter";

export const postRouter =  createRouter()
.mutation("createPost", {
    input: createPostSchema,
    async resolve({ ctx, input }) {

        const user = await ctx.user;

        if (!user) {
            new trpc.TRPCError({
                code: "UNAUTHORIZED",
                message: "You must be logged in to create a post"
            })
        }

        const post = await createPost(ctx.prisma, input, user?.id!);

        return post;

    }
})
.query('getPost', {
    input: getPostSchema,
    async resolve({ ctx, input }) {
        return getPost(ctx.prisma, input.postId);  
    }
})
.query('getPosts', {
    async resolve({ ctx }) {

        return getAllPosts(ctx.prisma);

    }
})  