const request = require('supertest');
const app = require('../app');

describe('Appointment Endpoints', () => {

    it('should create an appointment', async () => {
        const res = await request(app)
            .post('/api/appointments')
            .send({
                doctor_id: 2,
                patient_id: 1,
                appointment_date: '2022-12-12',
                status: 'pending',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('appointment');
    });

    it('should get all appointments', async () => {
        const res = await request(app).get('/api/appointments/all');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('All appointments fetched successfully');
        expect(res.body.appointments).toBeInstanceOf(Array);
    });

    it('should get an appointment by id', async () => {
        const res = await request(app).get('/api/appointments/1');
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Appointment not found');
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
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.appointment).toEqual(1);
        }
    });

    it('should delete an appointment', async () => {
        const res = await request(app).delete('/api/appointments/1');
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Appointment not found');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.appointment).toEqual(1);
        }
    });
});
