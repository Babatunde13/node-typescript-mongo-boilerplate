import { config } from 'dotenv'

config()

export default {
    port: parseInt(process.env.PORT || '3000'),
    db: {
        DATABASE_URL: process.env.DATABASE_URL || 'localhost',
    },
    env: process.env.NODE_ENV || 'development',
    secrets: {
        jwt: process.env.JWT_SECRET || 'secret',
    },
}
