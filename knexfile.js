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
            host: 'localhost',
            database: 'postgres',
            user: 'postgres',
            password:'12345',
            port: 3002
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

    test: {
        client: 'postgresql',
        connection: {
            user: 'postgres',
            password: '12345',
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
    }
};
