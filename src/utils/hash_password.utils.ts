import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return {
            data: hash
        }
    } catch (e) {
        return {
            error: new Error((e as Error).message)
        }
    }
}
