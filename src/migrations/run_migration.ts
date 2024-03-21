import path from 'path'
import { Db } from 'mongodb'
import { migrationConfig } from './config.migration'
import AppError from '../shared/AppError'
import envs from '../envs'
import logger from '../shared/logger'
import { AppDBConnection } from '../db_connection'

export interface Migration {
    default: (db: Db) => Promise<void>
}

export const runMigration = async () => {
    const db = new AppDBConnection(envs.database.url)
    await db.connect()

    const unprocessedMigrations = migrationConfig.filter((migration) => !migration.processed)
    if (unprocessedMigrations.length === 0) {
        logger.info('No unprocessed migrations')
        return
    }

    logger.info(`Running ${unprocessedMigrations.length} unprocessed migrations`)

    for (const migration of unprocessedMigrations) {
        logger.info(`Running migration: ${migration.name}`)
        const filename = migration.file
        const filepath = path.join(process.cwd(), 'dist', 'src', 'migrations', filename)

        try {
            const migrationModule: Migration = await import(filepath)
            await migrationModule.default(db.db)
            logger.info(`Migration ${migration.name} complete`)
        } catch (err) {
            logger.error(`Error running migration ${migration.name}`, new AppError({ error: (err as Error), type: 'MIGRATION_ERROR' }))
        }

    }

    await db.disconnect()
    logger.info('Migration complete')
}
