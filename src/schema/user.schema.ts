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

export type UserRegisterInput = z.TypeOf<typeof userRegisterSchema>

export type UserRegisterOutputInput = z.TypeOf<typeof userRegisterOutputSchema>