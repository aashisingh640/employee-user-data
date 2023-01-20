
const env = process.env.NODE_ENV || "development";
const config = require("./knexfile")[env];
const databaseName = config.connection.database;
config.connection.database = null;

let knex = require("knex")(config);

async function main() {
  
  const res = await knex.raw(`SELECT datname FROM pg_catalog.pg_database WHERE datname='${databaseName}'`);
  
  if (res.rowCount === 0) {
    await knex.raw("CREATE DATABASE ??", databaseName);
  }
  
  config.connection.database = databaseName;
  knex = require("knex")(config);

  await knex.migrate.latest();
}

main().catch(console.log).then(process.exit)