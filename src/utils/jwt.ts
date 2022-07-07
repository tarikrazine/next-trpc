import jwt from 'jsonwebtoken';

const secret = process.env.SECRET || 'secret';

export function signJwt(payload: any) {
    return jwt.sign(payload, secret)
}

export function verifyJwt<T>(token: string) {
    return jwt.verify(token, secret) as T;
}
