import logger from '../../logger'
import createTestServer from '../request_agent'

before('Starting Server', async () => {
    logger.info('Starting Server...', 'tests')
    await createTestServer()
})

after('Stopping Server', async () => {
    logger.info('Stopping Server...', 'tests')
    process.exit(0)
})
