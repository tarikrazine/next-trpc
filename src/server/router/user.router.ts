import * as trpc from "@trpc/server"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

import { userRegisterSchema, userRegisterOutputSchema } from "../../schema/user.schema"
import { userRegister } from "../../services/user.service"
import { createRouter } from "../createRouter"

export const userRouter = createRouter().mutation('register-user', {
    input: userRegisterSchema,
    output: userRegisterOutputSchema,
    async resolve({ctx, input}) {
        
        try {

            const user = await userRegister(ctx.prisma, input)

            return user

        } catch (error) {

            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new trpc.TRPCError({
                        code: 'CONFLICT',
                        message: 'User already exists'
                    })
                }

            }

            throw new trpc.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Something went wrong'
            })
        }

    }
})