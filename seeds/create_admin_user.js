exports.seed = async function (knex) {
  // Check if admin user already exists
  const adminUser = await knex('users')
    .where({ email: 'superadmin@gmail.com', role: 'admin' })
    .first();

  if (!adminUser) {
    // Hash the password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin', 10); // Replace 'your_password' with the actual password

    // Insert the admin user
    await knex('users').insert({
      first_name: 'Super',
      last_name: 'Admin',
      email: 'superadmin@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created successfully.');
  } else {
    console.log('Admin user already exists.');
  }
};
