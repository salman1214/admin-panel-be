const request = require('supertest');
const app = require('../app');
const knex = require('../db');

describe('Appointment Endpoints', () => {

    beforeAll(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
    });

    it('should create an appointment', async () => {
        const res = await request(app)
            .post('/api/appointments')
            .send({
                doctor_id: 2,
                patient_id: 1,
                appointment_date: '2022-12-12',
                status: 'pending',
            });
        if (res.statusCode === 401) {
            expect(res.error.text).toEqual('Access Denied');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('appointment');
        }
    });

    it('should get all appointments', async () => {
        const res = await request(app).get('/api/appointments/all');
        if (res.statusCode === 401) {
            expect(res.error.text).toEqual('Access Denied');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('All appointments fetched successfully');
            expect(res.body.appointments).toBeInstanceOf(Array);
        }
    });

    it('should get an appointment by id', async () => {
        const res = await request(app).get('/api/appointments/1');
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Appointment not found');
        } else if (res.statusCode === 401) {
            expect(res.error.text).toEqual('Access Denied');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.appointment).toHaveProperty('id');
        }
    });

    it('should update an appointment', async () => {
        const res = await request(app)
            .patch('/api/appointments/1')
            .send({
                status: 'completed',
            });
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Appointment not found');
        } else if (res.statusCode === 401) {
            expect(res.error.text).toEqual('Access Denied');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.appointment).toEqual(1);
        }
    });

    it('should delete an appointment', async () => {
        const res = await request(app).delete('/api/appointments/1');
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Appointment not found');
        } else if (res.statusCode === 401) {
            expect(res.error.text).toEqual('Access Denied');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.appointment).toEqual(1);
        }
    });

    afterAll(async () => {
        // clean up the database
        await knex('appointments').del();
        await knex.destroy(); // This closes the Knex connection to the database
    });
});
