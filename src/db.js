const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const knex = Knex(knexConfig.staging);
Model.knex(knex);

async function insertInitialRoles() {
    const existingAdmin = await User.query().findOne({ email: 'superadmin@gmail.com' });
    if (!existingAdmin) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin', salt);
        await User.query().insert({
            first_name: 'Super',
            last_name: 'Admin',
            email: 'superadmin@gmail.com',
            password: hashedPassword,
            role: 'admin',
        })
        console.log('Admin added');
    } else {
        console.log('Admin already exists');
    }
}

insertInitialRoles().catch(err => {
    console.error('Error inserting initial roles:', err);
})

module.exports = knex;
