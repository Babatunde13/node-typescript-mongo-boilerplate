# This file shows a sample migration file
The way the migration works is to run the `index.ts` file in this `migration` folder. This file runs the `run_migration` file which runs the unprocessed migrations in the migration config. Do not forget to change the `processed` field in the migration config to `true` after running the migration. I used this implementation because I do not want to have to comment out the migration files after running them.

##
To create a new migration file, create the migration file in this folder and the extension of the file should be `migration.ts` and add the file name to the `migration_config` file. The created file should export a default function which takes in a db which is the mongodb database instance. The file should look like this:

```ts
export default async function setActiveFieldForUsers (db: Db) {
    const userCollection = db.collection('users');
    await userCollection.updateMany({}, { $set: { active: true } });
    logger.info('Migration setActiveFieldForUsers ran successfully', { type: 'migration' });
}
```

In the `migration_config` file, we can update the array by adding the object below to the array

```ts
    {
        name: 'active field for users',
        file: 'migration_sample.mugration.ts',
        processed: false
    }
```
