import { Db } from 'mongodb'
import mongoose from 'mongoose'
import AppError from './shared/AppError'
import logger from './shared/logger'

export class AppDBConnection {
    client: mongoose.Connection
    db: Db
    options?: mongoose.ConnectOptions
    url: string

    constructor(url: string, options?: mongoose.ConnectOptions) {
        this.url = url
        this.options = options
    }

    async connect() {
        try {
            const connect = await mongoose.connect(this.url, this.options)
            this.client = connect.connection
            this.db = this.client.db
            logger.info('Connected to database')
            return { data: this.client }
        } catch (err) {
            const error = new AppError({ error: (err as Error), type: 'DATABASE_ERROR' })
            logger.error('Error connecting to database', error)
            return { error }
        }
    }

    async disconnect() {
        try {
            await this.client.close()
            logger.info('Disconnected from database')
            return { data: true }
        } catch (err) {
            const error = new AppError({ error: (err as Error), type: 'DATABASE_ERROR' })
            logger.error('Error disconnecting from database', error)
            return { error }
        }
    }

    /**
     *
     * Deletes all data from the database
     * use carefully
     */
    async drop() {
        try {
            await this.client.db.dropDatabase()
            logger.info('Dropped database')
            return { data: true }
        } catch (err) {
            const error = new AppError({ error: (err as Error), type: 'DATABASE_ERROR' })
            logger.error('Error dropping database', error)
            return { error }
        }
    }
}
