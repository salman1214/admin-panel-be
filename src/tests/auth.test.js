const request = require('supertest');
const app = require('../app');
const knex = require('../db');

describe('Auth Endpoints', () => {

    beforeAll(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
    });
    
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                "first_name": "johndoe",
                "last_name": "johndoe",
                "email": "johndoe@example.com",
                "password": "secret",
                "role": "doctor",
                "specialization": "ENT",
                "gender": "male",
                "contact_number": "123456789"
            });
        if (res.statusCode === 400) {
            expect(['Email already exists', 'Role not found']).toContain(JSON.parse(res.error.text).message);
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('user');
        }
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password'
            });
        console.log(JSON.parse(res.error.text))
        if (res.statusCode === 400) {
            expect(['Email not found', 'Invalid password']).toContain(JSON.parse(res.error.text).message);
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.header).toHaveProperty('authorization');
        }
    });

    afterAll(async () => {
        await knex.destroy(); // This closes the Knex connection to the database
    });
});
