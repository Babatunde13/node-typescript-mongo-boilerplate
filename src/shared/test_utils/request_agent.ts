import envs from '../../envs'
import request from 'supertest'
import { startServer } from '../../server'
import { routes } from '../../server_config'
import { AppDBConnection } from 'src/db_connection'

const createTestServer = async (db: AppDBConnection) => {
    const config = {
        port: envs.port,
        db,
        routes
    }

    const app = await startServer(config)

    return request.agent(app)
}

export const getAgent = () => {
    return request(envs.host)
}

export default createTestServer
