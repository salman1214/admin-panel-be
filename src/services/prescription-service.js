const Prescription = require("../models/Prescription");

exports.createPrescription = async (body) =>
    await Prescription.query().insert(body);