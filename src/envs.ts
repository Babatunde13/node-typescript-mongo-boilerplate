import { config } from 'dotenv'

config()

const getDatabaseUrl = () => {
    if (process.env.NODE_ENV === 'test') {
        return process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/express-ts-boilerplate-test'
    }

    return process.env.DATABASE_URL || 'mongodb://localhost:27017/express-ts-boilerplate'
}

export default {
    port: parseInt(process.env.PORT || '3001'),
    host: process.env.HOST || 'localhost:3001',
    db: {
        DATABASE_URL: getDatabaseUrl(),
    },
    env: process.env.NODE_ENV || 'development',
    secrets: {
        jwt: process.env.JWT_SECRET || 'secret',
    },
}
