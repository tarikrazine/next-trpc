import { createRouter } from "../createRouter";

export const appRouter = createRouter()
    .query('healthcheck', {
        resolve: () => {
            return 'OK'
        }
    })

export type AppRouter = typeof appRouter