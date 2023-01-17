import { startServer } from './server'
import { routes } from './server_config'
import envs from './envs'
import { createDbConnection } from './db_connection'
import isError from './utils/is_error.utils';
import logger from './shared/logger';

export const runServer = async () => {
    const connection = await createDbConnection()
    if (isError(connection)) {
        logger.error('Error connecting to database', 'Database Connection')
        return
    }
    await startServer({
        port: envs.port,
        routes
    })
}

runServer()
