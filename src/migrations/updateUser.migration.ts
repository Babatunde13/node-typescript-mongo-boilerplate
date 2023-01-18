import { Db } from 'mongodb'
import logger from '../shared/logger'

export default async function updateUserProfile (db: Db) {
    const usersCollection = db.collection('users')
    const usersCount = await usersCollection.countDocuments()
    logger.info(`Updating ${usersCount} users profile...`, 'Migration')

    //  Update users profile here using low level mongodb driver

    logger.success('Users profile updated successfully', 'Migration')
}
