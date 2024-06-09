// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    // development: {
    //     client: 'sqlite3',
    //     connection: {
    //         filename: './dev.sqlite3'
    //     },
    //     useNullAsDefault: true,
    //     migrations: {
    //         directory: './migrations'
    //     },
    //     seeds: {
    //         directory: './seeds'
    //     }
    // },

    staging: {
        client: process.env.DB_CLIENT,
        connection: {
            // host: '127.0.0.1',
            database: process.env.DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },
};
