import { createRouter } from "../createRouter";
import { userRouter } from "./user.router";

export const appRouter = createRouter()
    .query('healthcheck', {
        resolve: () => {
            return 'OK'
        }
    })
    .merge('users.', userRouter)

export type AppRouter = typeof appRouter