const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Treatment = require("../models/Treatment");
const Appointment = require("../models/Appointment");

exports.getAnalytics = async () => {
    const totalDoctors = await Doctor.query().resultSize();
    const totalPatients = await Patient.query().resultSize();
    const totalTreatments = await Treatment.query().resultSize();
    const totalAppointments = await Appointment.query().resultSize();

    return {
        status: 200,
        data: {
            totalDoctors,
            totalPatients,
            totalTreatments,
            totalAppointments,
        },
    };
};