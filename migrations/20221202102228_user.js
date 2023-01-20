/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.string('emailId');
        table.string('phoneNo');
        table.string('employeeCode');
        table.string('region');
        table.string('jobRole');
        table.string('company');
        table.datetime('updated_at');
        table.datetime('created_at');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => {
    return knex.schema.dropTable('users');
};
