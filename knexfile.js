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

    development: {
        client: 'postgresql',
        connection: {
            // host: '127.0.0.1',
            // database: 'hospital',
            user: 'postgres',
            password:'12345'
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
