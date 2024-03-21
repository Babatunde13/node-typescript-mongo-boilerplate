import nock from 'nock'
import { AppDBConnection } from '../../../db_connection'
import logger from '../../logger'
import createTestServer from '../request_agent'
import envs from '../../../envs'

let db
before('Starting Server', async () => {
    logger.info('Starting Server...')
    db = new AppDBConnection(envs.database.url)
    db.disconnect
    await createTestServer(db)
})


afterEach(async () => {
    nock.cleanAll()
    if (db) {
        logger.info('Dropping DB...')
        await db.drop()
    }
})

after('Stopping Server', async () => {
    logger.info('Stopping Server...')
    if (db) {
        logger.info('Closing DB Connection...')
        await db.disconnect()
    }
    process.exit(0)
})
