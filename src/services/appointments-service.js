const Appointment = require("../models/Appointment");

exports.createAppointment = async (body) => {
    try {
        const appointment = await Appointment.query().insert(body);
        return {
            status: 200,
            message: "Appointment created successfully",
            appointment
        };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.getAllAppointments = async () => {
    try {
        const appointments = await Appointment.query();
        return {
            status: 200,
            message: "All appointments fetched successfully",
            appointments
        };
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
        if (!appointment) {
            return { status: 404, message: "Appointment not found" };
        }
        return { status: 200, appointment };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.deleteAppointment = async (id) => {
    try {
        const appointment = await Appointment.query().deleteById(id);
        if (!appointment) {
            return { status: 404, message: "Appointment not found" };
        }
        return { status: 200, appointment };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}