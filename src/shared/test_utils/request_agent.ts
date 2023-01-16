import envs from '../../envs'
import request from 'supertest'
import { startServer } from '../../server'
import { routes } from '../../server_config'

const createTestServer = async () => {
    const config = {
        port: envs.port,
        routes
    }

    const app = await startServer(config)

    return request.agent(app)
}

export const getAgent = () => {
    return request(envs.host)
}

export default createTestServer
