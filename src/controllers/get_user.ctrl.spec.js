import { getAgent } from '..//shared/test_utils/request_agent'
import expect from '../shared/test_utils/expect'

let agent

describe('Get Users Controller', () => {
    before('Starting Server', async () => {
        agent = await getAgent()
    })

    it('should require authentication', async () => {
        const response = await agent.get('/api/v1/users')
        expect(response.status).toBe(401)
    })
})
