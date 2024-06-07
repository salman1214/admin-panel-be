/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('prescriptions', table => {
        table.increments('id').primary();
        table.string('medicine').notNullable();
        table.string('dosage').notNullable();
        table.string('duration').notNullable();
        table.integer('treatment_id').unsigned().notNullable().references('id').inTable('treatments').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('prescriptions');
};
