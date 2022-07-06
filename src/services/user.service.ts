import { PrismaClient } from '@prisma/client';

import { UserRegisterInput, UserRegisterOutputInput } from '../schema/user.schema';

export function userRegister(prisma: PrismaClient, input: UserRegisterInput): Promise<UserRegisterOutputInput> {
    return prisma.user.create({
        data: input
    });
}