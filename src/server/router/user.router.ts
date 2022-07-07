import * as trpc from "@trpc/server"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

import { userRegisterSchema, userRegisterOutputSchema, requestOTPSchema, verifyOptSchema } from "../../schema/user.schema"
import { findLoginToken, findUser, requestOTP, userRegister } from "../../services/user.service"
import { createRouter } from "../createRouter"
import sendMail from "../../utils/mail"
import { baseUrl } from "../../constants"
import { decode, encode } from "../../utils/base64"
import { signJwt } from "../../utils/jwt"
import { serialize } from "cookie"

export const userRouter = createRouter()
.mutation('register-user', {
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
.mutation('request-otp', {
    input: requestOTPSchema,
    async resolve({ctx, input}) {

        const user = await findUser(ctx.prisma, input.email)

        if (!user) {
            throw new trpc.TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found'
            })
        }

        const loginToken = await requestOTP(ctx.prisma, input.redirect, user.id)

        await sendMail({
            email: user.email,
            url :baseUrl,
            token: encode(`${loginToken.id}:${user.email}`)
        })
        
        return true
    }
})
.query('verify-opt', {
    input: verifyOptSchema,
    async resolve({ctx, input}) {
            
            const [id, email] = decode(input.hash).split(':')
    
            const token = await findLoginToken(ctx.prisma, id, email)
    
            if (!token) {
                throw new trpc.TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Login token not found'
                })
            }

            const jwt = signJwt({
                id: token.user.id,
                email: token.user.email
            })

            ctx.res.setHeader('Set-Cookie', serialize('token', jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                }))

            return {
                redirect: token.redirect
            }
    }
})
.query('me', {
    async resolve({ctx}) {
        return ctx.user
    }
})