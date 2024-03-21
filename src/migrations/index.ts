import { runMigration } from './run_migration'

/**
 * Run all active migrations
 */
(async () => {
    await runMigration()
    process.exit(0)
})()
