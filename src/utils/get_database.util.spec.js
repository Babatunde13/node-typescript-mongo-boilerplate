import getDatabase from './get_database.util'
import expect from '../shared/test_utils/expect'
import { createStub } from '../shared/test_utils/stub'
import envs from '../envs'

describe('getDatabase', () => {
    it('should return database object', async () => {
        const databaseStub = createStub(envs.db, 'DATABASE_URL', 'mongodb://localhost:27017/test')
        const database = await getDatabase()
        expect(database.data).toBeTruthy()
        databaseStub.restore()
    })

    it('should return the same database object', async () => {
        const databaseStub = createStub(envs.db, 'DATABASE_URL', 'mongodb://localhost:27017/test')
        const databaseStub2 = createStub(envs.db, 'DATABASE_URL', 'mongodb://localhost:27017/test')
        const database1 = await getDatabase()
        const database2 = await getDatabase()
        expect(database1.data).toDeepEqual(database2.data)
        databaseStub.restore()
        databaseStub2.restore()
    })

    it('should have database object with correct properties', async () => {
        const databaseStub = createStub(envs.db, 'DATABASE_URL', 'mongodb://localhost:27017/test')
        const database = await getDatabase()
        expect(database.data).toHaveProperty('collection')
        expect(database.data).toHaveProperty('collections')
        expect(database.data).toHaveProperty('command')
        expect(database.data).toHaveProperty('createCollection')
        expect(database.data).toHaveProperty('createIndex')
        databaseStub.restore()
    })
})
