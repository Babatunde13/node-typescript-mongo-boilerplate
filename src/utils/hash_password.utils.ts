import bcrypt from 'bcrypt'
import AppError from '../shared/AppError'

export const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return {
            data: hash
        }
    } catch (e) {
        return {
            error: new AppError((e as Error).message, 'invalid_hashing')
        }
    }
}
