import { config } from 'dotenv'

config()

export default {
    port: parseInt(process.env.PORT || '3001'),
    host: process.env.HOST || 'localhost:3001',
    db: {
        DATABASE_URL: process.env.DATABASE_URL || 'localhost',
    },
    env: process.env.NODE_ENV || 'development',
    secrets: {
        jwt: process.env.JWT_SECRET || 'secret',
    },
}
