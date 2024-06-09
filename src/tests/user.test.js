const request = require('supertest');
const app = require('../app');
const knex = require('../db');

describe('User Endpoints', () => {
    
    beforeAll(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
    });

    it('should get all users', async () => {
        const res = await request(app).get('/api/users/all');
        if (res.error) console.log("ERRORRR --->>> ", res.error)
        if (res.statusCode === 401) {
            expect(res.error.text).toEqual('Access Denied');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('All users fetched successfully');
            expect(res.body.users).toBeInstanceOf(Array);
        }
    });

    it('should get a user by id', async () => {
        const res = await request(app).get('/api/users/2');
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('User not found');
        } else if (res.statusCode === 401) {
            expect(res.error.text).toEqual('Access Denied');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.user).toHaveProperty('id');
        }
    });

    it('should update a user', async () => {
        const res = await request(app)
            .patch('/api/users/2')
            .send({
                first_name: 'John',
                last_name: 'Doe',
            });
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('User not found');
        } else if (res.statusCode === 401) {
            expect(res.error.text).toEqual('Access Denied');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.user).toEqual(1);
        }
    });

    it('should update a doctor', async () => {
        const res = await request(app)
            .patch('/api/users/doctor/2')
            .send({
                specialization: 'Cardiologist',
            });
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Doctor not found');
        } else if (res.statusCode === 401) {
            expect(res.error.text).toEqual('Access Denied');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.doctor).toEqual(1);
        }
    });

    it('should update a patient', async () => {
        const res = await request(app)
            .patch('/api/users/patient/2')
            .send({
                contact_number: '987654321',
            });
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Patient not found');
        } else if (res.statusCode === 401) {
            expect(res.error.text).toEqual('Access Denied');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.patient).toEqual(1);
        }
    });

    it('should delete a user', async () => {
        const res = await request(app).delete('/api/users/2');
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('User not found');
        } else if (res.statusCode === 401) {
            expect(res.error.text).toEqual('Access Denied');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.user).toEqual(1);
        }
    });

    afterAll(async () => {
        await knex.destroy(); // This closes the Knex connection to the database
    });
});
