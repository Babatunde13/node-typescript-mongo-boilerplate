import { config } from 'dotenv'

config()

const getDatabaseUrl = () => {
    if (process.env.NODE_ENV === 'test') {
        return process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/express-ts-boilerplate-test'
    }

    return process.env.DATABASE_URL || 'mongodb://localhost:27017/express-ts-boilerplate'
}

const envs = {
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

const verifyEnv = () => {
    if (!envs.db.DATABASE_URL) {
        throw new Error('DATABASE_URL is not set')
    }

    if (!envs.secrets.jwt) {
        throw new Error('JWT_SECRET is not set')
    }

    if (!envs.port) {
        throw new Error('PORT is not set')
    }

    if (!envs.host) {
        throw new Error('HOST URL is not set')
    }

    if (!envs.env) {
        throw new Error('NODE_ENV is not set')
    }

    return true
}

verifyEnv()

export default envs
