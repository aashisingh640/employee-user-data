module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER || 'aashi.singh',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'user-data',
        },
        migrations: {
            tableName: "knex_migrations"
        },
        seeds: {
            directory: __dirname + "/seeds"
        },
        debug: true
    },

    production: {
        client: 'postgresql',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
