const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

exports.register = async (body) => {
    try {
        const userExists = await User.query().findOne({ email: body.email });
        if (userExists) return { status: 400, message: 'Email already exists' };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        const userInfo = {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: hashedPassword,
            role: body.role,
        }

        const newUser = await User.query().insert(userInfo);

        if (body.role.toLowerCase() === 'doctor') {
            await Doctor.query().insert({
                user_id: newUser.id,
                specialization: body.specialization,
                gender: body.gender,
                contact_number: body.contact_number,
            });
            const userData = await Doctor.query().findOne({ user_id: newUser.id }).withGraphFetched('user');
            return {
                status: 200,
                message: 'Doctor created successfully',
                user: userData
            };
        } else if (body.role.toLowerCase() === 'patient') {
            await Patient.query().insert({
                user_id: newUser.id,
                dob: body.dob,
                gender: body.gender,
                contact_number: body.contact_number,
            });
            const userData = await Patient.query().findOne({ user_id: newUser.id }).withGraphFetched('user');
            return {
                status: 200,
                message: 'Patient created successfully',
                user: userData
            };
        } else {
            return { status: 400, message: 'Role not found' };
        }

    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
};

exports.login = async (body) => {
    const { email, password } = body;

    try {
        const user = await User.query().findOne({ email });
        if (!user) return { status: 400, message: 'Email not found' };

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return { status: 400, message: 'Invalid password' };

        const token = jwt.sign({ id: user.id, email, password, roleId: user.role_id }, process.env.TOKEN_SECRET);
        return {
            status: 200,
            message: 'Login successful',
            token,
            user
        };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
};