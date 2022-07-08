import { PrismaClient } from "@prisma/client";

import { CreatePostInput } from "../schema/post.schema";

export function createPost(prisma: PrismaClient, input: CreatePostInput, userId: string) {
    return prisma.post.create({
        data: {
            ...input,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });
}

export function getPost(prisma: PrismaClient, id: string) {
    return prisma.post.findUnique({
        where: {
            id
        }
    });
}

export function getAllPosts(prisma: PrismaClient) {
    return prisma.post.findMany();
}