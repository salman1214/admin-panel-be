
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('role').notNullable();
        table.timestamps(true, true);
    }).createTable('doctors', table => {
        table.increments('id').primary();
        table.string('specialization').nullable();
        table.string('gender').nullable();
        table.string('contact_number').nullable();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true);
    }).createTable('patients', table => {
        table.increments('id').primary();
        table.string('dob').nullable();
        table.string('gender').nullable();
        table.string('contact_number').nullable();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true);
    }).createTable('appointments', table => {
        table.increments('id').primary();
        table.string('appointment_date').notNullable();
        table.string('status').notNullable();
        table.integer('doctor_id').unsigned().notNullable().references('id').inTable('doctors').onDelete('CASCADE');
        table.integer('patient_id').unsigned().notNullable().references('id').inTable('patients').onDelete('CASCADE');
        table.timestamps(true, true);
    }).createTable('treatments', table => {
        table.increments('id').primary();
        table.string('description').notNullable();
        table.string('treatment_date').notNullable();
        table.integer('patient_id').unsigned().notNullable().references('id').inTable('patients').onDelete('CASCADE');
        table.timestamps(true, true);
    }).createTable('prescriptions', table => {
        table.increments('id').primary();
        table.string('medicine').notNullable();
        table.string('dosage').notNullable();
        table.string('duration').notNullable();
        table.integer('treatment_id').unsigned().notNullable().references('id').inTable('treatments').onDelete('CASCADE');
        table.timestamps(true, true);
    })
};


exports.down = function (knex) {
    return knex.schema
        .dropTable('prescriptions')
        .dropTable('treatments')
        .dropTable('appointments')
        .dropTable('patients')
        .dropTable('doctors')
        .dropTable('users');
};
