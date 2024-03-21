import { startServer } from './server'
import { routes } from './server_config'
import envs from './envs'
import { AppDBConnection } from './db_connection'

export const runServer = async () => {
    const appDB = new AppDBConnection(envs.database.url)
    await startServer({
        port: envs.port,
        routes,
        db: appDB
    })
}

runServer()
