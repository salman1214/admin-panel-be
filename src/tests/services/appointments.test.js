const knex = require("../../db");
const appointmentsService = require("../../services/appointments-service");

describe('Appointments Service', () => {

    beforeAll(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
    });

    let id;
    describe('createAppointment', () => {
        it('should create a new appointment', async () => {
            const body = {
                "appointment_date": "06-06-1996",
                "status": "pending",
                "doctor_id": 1,
                "patient_id": 1
            };

            const result = await appointmentsService.createAppointment(body);
            id = result.appointment.id;
            expect(result.status).toEqual(200);
            expect(result.message).toEqual('Appointment created successfully');
            expect(result.appointment).toBeDefined();
            // Add additional assertions for the created appointment
        });

        it('should return an error if appointment creation fails', async () => {
            const body = {
                "appointment_date": "06-06-1996",
                "status": "pending",
                "doctor_id": 1,
                "patient_id": 5
            };

            const result = await appointmentsService.createAppointment(body);

            expect(result.status).toEqual(400);
            expect(result.message).toBeDefined();
        });
    });

    describe('getAllAppointments', () => {
        it('should fetch all appointments', async () => {
            const result = await appointmentsService.getAllAppointments();

            expect(result.status).toEqual(200);
            expect(result.message).toEqual('All appointments fetched successfully');
            expect(result.appointments).toBeDefined();
            // Add additional assertions for the fetched appointments
        });
    });

    describe('getAppointmentById', () => {
        it('should fetch an appointment by ID', async () => {
            const appointmentId = id; // Provide an existing appointment ID

            const result = await appointmentsService.getAppointmentById(appointmentId);

            expect(result.status).toEqual(200);
            expect(result.appointment).toBeDefined();
            // Add additional assertions for the fetched appointment
        });

        it('should return an error if appointment is not found', async () => {
            const id = 999; // Provide a non-existing appointment ID

            const result = await appointmentsService.getAppointmentById(id);

            expect(result.status).toEqual(404);
            expect(result.message).toEqual('Appointment not found');
        });

        it('should return an error if fetching appointment by ID fails', async () => {
            const id = 'invalid'; // Provide an invalid appointment ID

            const result = await appointmentsService.getAppointmentById(id);

            expect(result.status).toEqual(400);
            expect(result.message).toBeDefined();
        });
    });

    describe('updateAppointment', () => {
        it('should update an appointment', async () => {
            const appointmentId = id; // Provide an existing appointment ID
            const body = {
                "status": "completed"
            };

            const result = await appointmentsService.updateAppointment(appointmentId, body);

            expect(result.status).toEqual(200);
            expect(result.appointment).toBeDefined();
            // Add additional assertions for the updated appointment
        });

        it('should return an error if appointment is not found for update', async () => {
            const id = 999; // Provide a non-existing appointment ID
            const body = {
                "status": "completed"
            };

            const result = await appointmentsService.updateAppointment(id, body);

            expect(result.status).toEqual(404);
            expect(result.message).toEqual('Appointment not found');
        });

        it('should return an error if updating appointment fails', async () => {
            const id = 'invalid'; // Provide an invalid appointment ID
            const body = {
                "status": "completed"
            };

            const result = await appointmentsService.updateAppointment(id, body);

            expect(result.status).toEqual(400);
            expect(result.message).toBeDefined();
        });
    });

    describe('deleteAppointment', () => {
        it('should delete an appointment', async () => {
            const appointmentId = id; // Provide an existing appointment ID

            const result = await appointmentsService.deleteAppointment(appointmentId);

            expect(result.status).toEqual(200);
            expect(result.appointment).toBeDefined();
            // Add additional assertions for the deleted appointment
        });

        it('should return an error if appointment is not found for deletion', async () => {
            const id = 999; // Provide a non-existing appointment ID

            const result = await appointmentsService.deleteAppointment(id);

            expect(result.status).toEqual(404);
            expect(result.message).toEqual('Appointment not found');
        });

        it('should return an error if deleting appointment fails', async () => {
            const id = 'invalid'; // Provide an invalid appointment ID

            const result = await appointmentsService.deleteAppointment(id);

            expect(result.status).toEqual(400);
            expect(result.message).toBeDefined();
        });
    });

    afterAll(async () => {
        await knex.destroy();
    });
});