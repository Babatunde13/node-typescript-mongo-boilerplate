import { startServer } from './server'
import { routes } from './server_config'
import envs from './envs'
import { createDbConnection } from './db_connection'
import isError from './utils/is_error.utils';

export const runServer = async () => {
    const connection = await createDbConnection()
    if (isError(connection)) {
        console.log('Error connecting to database')
        return
    }
    await startServer({
        port: envs.port,
        routes
    })
}

runServer()
