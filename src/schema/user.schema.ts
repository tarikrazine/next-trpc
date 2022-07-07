import z from "zod"

const coreUserSchema = {
    name: z.string(),
    email: z.string().email()
}

export const userRegisterSchema = z.object({
    ...coreUserSchema
})

export const userRegisterOutputSchema = z.object({
    ...coreUserSchema
})

export const requestOTPSchema = z.object({
    email: z.string().email(),
    redirect: z.string().default('/')
})

export const verifyOptSchema = z.object({
    hash: z.string()
})

export type UserRegisterInput = z.TypeOf<typeof userRegisterSchema>

export type UserRegisterOutputInput = z.TypeOf<typeof userRegisterOutputSchema>

export type RequestOTPInput = z.TypeOf<typeof requestOTPSchema>

export type verifyOptInput = z.TypeOf<typeof verifyOptSchema>