import { PrismaClient } from '@prisma/client';

import { UserRegisterInput, UserRegisterOutputInput } from '../schema/user.schema';

export function userRegister(prisma: PrismaClient, input: UserRegisterInput): Promise<UserRegisterOutputInput> {
    return prisma.user.create({
        data: input
    });
}

export function findUser(prisma: PrismaClient, email: string) {
    return prisma.user.findUnique({
        where: {
            email
        }
    });
}

export function requestOTP(prisma: PrismaClient, redirect: string, userId: string) {
    return prisma.loginToken.create({
        data: {
            redirect,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });
}

export function findLoginToken(prisma: PrismaClient, id: string, email: string) {
    return prisma.loginToken.findFirst({
        where: {
            id,
            user: {
                email
            }
        },
        include: {
            user: true
        }
    });
}