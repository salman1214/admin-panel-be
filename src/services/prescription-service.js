const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");

exports.createPrescription = async (body) =>
    await Prescription.query().insert(body);


exports.getAllAppointments = async () => {
    try {
        const appointments = await Appointment.query();
        return { status: 200, appointments };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.getAppointmentById = async (id) => {
    try {
        const appointment = await Appointment.query().findById(id);
        if (!appointment) {
            return { status: 404, message: "Appointment not found" };
        }
        return { status: 200, appointment };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.updateAppointment = async (id, body) => {
    try {
        const appointment = await Appointment.query().findById(id).patch(body);
        return { status: 200, appointment };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.deleteAppointment = async (id) => {
    try {
        const appointment = await Appointment.query().deleteById(id);
        return { status: 200, appointment };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}