import mongoose from 'mongoose'
import envs from './envs'

export const createDbConnection = async () => {
    try {
        const connection = await mongoose.connect(envs.db.DATABASE_URL)
        return {
            data: connection,
        }
    } catch (e) {
        return {
            error: e
        }
    }
}
