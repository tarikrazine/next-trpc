import { NextApiRequest, NextApiResponse } from "next";
import { verifyJwt } from "../utils/jwt";

import { prisma } from "../utils/prisma";

interface CtxUser {
    id: string
    email: string
    iat: number
}

async function getUserFromRequest(req: NextApiRequest) {

    const token = req.cookies.token as string;

    if (token) {
        try  {
            
            return verifyJwt<CtxUser>(token);

        } catch (e) {
            return null
        }
    }

    return null;
}

export function createContext({
    req,
    res
}: {
    req: NextApiRequest,
    res: NextApiResponse
}) {

    const user = getUserFromRequest(req);

    return {
        req,
        res,
        prisma,
        user
    }
}

export type Context = ReturnType<typeof createContext>
