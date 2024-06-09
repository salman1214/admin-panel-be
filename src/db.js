const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');

const knex = Knex(knexConfig.staging);
Model.knex(knex);
async function runSeeds() {
    try {
        await knex.seed.run();
        console.log('Seeds ran successfully.');
    } catch (error) {
        console.error('Error running seeds:', error);
    }
}

// Your existing application initialization logic

async function initializeApp() {
    try {
        // Database migrations can be run here if needed
        await knex.migrate.latest();
        console.log('Database migrated successfully.');

        // Run seeds after migration
        await runSeeds();

        // Continue with the rest of your application initialization
        // For example, starting the server, etc.
    } catch (error) {
        console.error('Error initializing the app:', error);
    }
}

// Initialize the application
initializeApp();

module.exports = knex
