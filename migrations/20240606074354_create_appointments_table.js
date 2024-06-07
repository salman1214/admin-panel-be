/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('appointments', table => {
        table.increments('id').primary();
        table.string('appointment_date').notNullable();
        table.string('status').notNullable();
        table.integer('doctor_id').unsigned().notNullable().references('id').inTable('doctors').onDelete('CASCADE');
        table.integer('patient_id').unsigned().notNullable().references('id').inTable('patients').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('appointments');
};
