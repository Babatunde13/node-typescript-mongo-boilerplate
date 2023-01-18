import isError from '../utils/is_error.utils'
import getDatabase from '../utils/get_database.util'
import AppError from '../shared/AppError'
import updateUserProfile from './updateUser.migration'

const run = async () => {
    const databaseResult = await getDatabase()
    if (isError(databaseResult)) {
        throw new AppError((databaseResult.error as Error).message, 'database_connection_error')
    }

    if (!databaseResult.data) {
        throw new AppError('Database object could not be retrieved', 'database_connection_error')
    }

    const database = databaseResult.data
    await updateUserProfile(database)

    process.exit(0)
}

run()
