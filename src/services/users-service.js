const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const User = require("../models/User");

exports.getAllUsers = async () => {
    try {
        const doctors = await Doctor.query().withGraphFetched('user');
        const patients = await Patient.query().withGraphFetched('user');
        return {
            status: 200,
            message: "All users fetched successfully",
            users: [...doctors, ...patients]
        };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.getUserById = async (id) => {
    try {
        const user = await User.query().findById(id);
        if (!user) return { status: 404, message: 'User not found' };
        if (user.role === 'doctor') {
            const doctor = await Doctor.query().findOne({ user_id: id }).withGraphFetched('user');
            return { status: 200, user: doctor };
        } else if (user.role === 'patient') {
            const patient = await Patient.query().findOne({ user_id: id }).withGraphFetched('user');
            return { status: 200, user: patient };
        }
        return { status: 200, user };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.updateUser = async (id, body) => {
    try {
        const user = await User.query().findById(id).patch(body);
        if (!user) return { status: 404, message: 'User not found' };
        return { status: 200, user };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.updateDoctor = async (id, body) => {
    try {
        const doctor = await Doctor.query().findOne({ user_id: id }).patch(body);
        if (!doctor) return { status: 404, message: 'Doctor not found' };
        return { status: 200, doctor };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.updatePatient = async (id, body) => {
    try {
        const patient = await Patient.query().findOne({ user_id: id }).patch(body);
        if (!patient) return { status: 404, message: 'Patient not found' };
        return { status: 200, patient };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.deleteUserById = async (id) => {
    try {
        const user = await User.query().findById(id);
        if (!user) return { status: 404, message: 'User not found' };
        if (user.role === 'doctor') {
            await Doctor.query().delete().where('user_id', id);
        } else if (user.role === 'patient') {
            await Patient.query().delete().where('user_id', id);
        }
        await User.query().deleteById(id);
        return { status: 200, message: "User deleted successfully" };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}