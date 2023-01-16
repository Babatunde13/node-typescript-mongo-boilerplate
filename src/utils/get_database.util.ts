import mongoose from 'mongoose';
import { promisify } from 'util';
import envs from '../envs';

export default async function getDatabase() {
    try {
        const url = envs.db.DATABASE_URL;
        console.log(url);
        await promisify(mongoose.connect)(url);
        const databaseConnection = mongoose.connection;

        return {
            data: databaseConnection.db
        }

    } catch (e) {
        return {
            error: e
        }
    }
}
