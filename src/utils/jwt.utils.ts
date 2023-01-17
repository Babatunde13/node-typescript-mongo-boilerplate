import jwt from 'jsonwebtoken'
import AppError from '../shared/AppError'
import envs from '../envs'

export const encodeUser = (userId: string) => {
    try {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            data: userId
        }, envs.secrets.jwt)
        return {
            data: token
        }
    } catch (e) {
        return {
            error: new AppError((e as Error).message, 'invalid_encoding')
        }
    }
}

export const decodeUser = async (token: string) => {
    try {
        const userId = jwt.verify(token, envs.secrets.jwt).sub
        return {
            data: userId
        }
    } catch (e) {
        return {
            error: new AppError((e as Error).message, 'invalid_decoding')
        }
    }
}
