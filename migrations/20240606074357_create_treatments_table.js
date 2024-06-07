/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('treatments', table => {
        table.increments('id').primary();
        table.string('description').notNullable();
        table.string('treatment_date').notNullable();
        table.integer('patient_id').unsigned().notNullable().references('id').inTable('patients').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('treatments');
};
