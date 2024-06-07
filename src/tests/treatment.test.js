const request = require('supertest');
const app = require('../app');

describe('Treatment Endpoints', () => {

    it('should create a treatment', async () => {
        const res = await request(app)
            .post('/api/treatments')
            .send({
                treatment: {
                    description: 'Description 1',
                    treatment_date: '2022-12-12',
                    patient_id: 1,
                },
                prescription: {
                    medicine: 'Medicine 1',
                    dosage: 'Dosage 1',
                    duration: '4 days',
                }
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('treatment');
    });

    it('should get all treatments', async () => {
        const res = await request(app).get('/api/treatments/all');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('All treatments fetched successfully');
        expect(res.body.treatments).toBeInstanceOf(Array);
    });

    it('should get a treatment by id', async () => {
        const res = await request(app).get('/api/treatments/1');
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Treatment not found');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.treatment).toHaveProperty('id');
        }
    });

    it('should update a treatment', async () => {
        const res = await request(app)
            .patch('/api/treatments/1')
            .send({
                description: 'Description 2',
            });
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Treatment not found');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.treatment).toEqual(1);
        }
    });

    it('should delete a treatment', async () => {
        const res = await request(app).delete('/api/treatments/1');
        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Treatment not found');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.treatment).toEqual(1);
        }
    });

});