import z from "zod"

export const createPostSchema = z.object({
    title: z.string(),
    content: z.string(),
})

export const getPostSchema = z.object({
    postId: z.string(),
})

export type CreatePostInput = z.TypeOf<typeof createPostSchema>