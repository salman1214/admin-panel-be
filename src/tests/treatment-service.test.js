const request = require('supertest');
const app = require('../app');
const Prescription = require('../models/Prescription');
const Treatment = require('../models/Treatment');
const { createPrescription } = require('../services/prescription-service');

describe('Prescription Endpoints', () => {
    let treatmentId;
    let prescriptionId;

    beforeAll(async () => {
        // Create a treatment for testing
        const treatment = await Treatment.query().insert({ /* insert treatment data */ });
        treatmentId = treatment.id;
    });

    afterAll(async () => {
        // Clean up the created treatment and prescription
        await Prescription.query().delete().where('treatment_id', treatmentId);
        await Treatment.query().deleteById(treatmentId);
    });

    it('should create a prescription', async () => {
        const prescriptionData = { /* insert prescription data */ };

        const res = await request(app)
            .post('/api/prescriptions')
            .send(prescriptionData);

        expect(res.statusCode).toEqual(200);
        expect(res.body.prescription).toHaveProperty('id');
        expect(res.body.prescription).toHaveProperty('treatment_id', treatmentId);

        prescriptionId = res.body.prescription.id;
    });

    it('should get all prescriptions', async () => {
        const res = await request(app).get('/api/prescriptions');

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('All prescriptions fetched successfully');
        expect(res.body.prescriptions).toBeInstanceOf(Array);
    });

    it('should get a prescription by id', async () => {
        const res = await request(app).get(`/api/prescriptions/${prescriptionId}`);

        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Prescription not found');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.prescription).toHaveProperty('id', prescriptionId);
        }
    });

    it('should update a prescription', async () => {
        const updatedPrescriptionData = { /* insert updated prescription data */ };

        const res = await request(app)
            .patch(`/api/prescriptions/${prescriptionId}`)
            .send(updatedPrescriptionData);

        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Prescription not found');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.prescription).toEqual(1);
        }
    });

    it('should delete a prescription', async () => {
        const res = await request(app).delete(`/api/prescriptions/${prescriptionId}`);

        if (res.statusCode === 404) {
            expect(JSON.parse(res.error.text).message).toEqual('Prescription not found');
        } else {
            expect(res.statusCode).toEqual(200);
            expect(res.body.prescription).toEqual(1);
        }
    });
});