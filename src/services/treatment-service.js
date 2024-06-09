const Prescription = require("../models/Prescription");
const Treatment = require("../models/Treatment");
const { createPrescription } = require("./prescription-service");

exports.createTreatment = async (body) => {
    try {
        const treatment = await Treatment.query().insert(body.treatment);
        const prescription = await createPrescription({ ...body.prescription, treatment_id: treatment.id })
        return { status: 200, treatment: { ...treatment, prescription } };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.getAllTreatments = async () => {
    try {
        const treatments = await Treatment.query().withGraphFetched('[prescription, patient.user]');
        return {
            status: 200,
            message: "All treatments fetched successfully",
            treatments
        };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.getTreatmentById = async (id) => {
    try {
        const treatment = await Treatment.query().findById(id).withGraphFetched('prescription');
        if (!treatment) {
            return { status: 404, message: "Treatment not found" };
        }
        return { status: 200, treatment };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.updateTreatment = async (id, body) => {
    try {
        const treatment = await Treatment.query().findById(id).patch(body);
        if (!treatment) {
            return { status: 404, message: "Treatment not found" };
        }
        return { status: 200, treatment };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}

exports.deleteTreatment = async (id) => {
    try {
        const treatmentExists = await Treatment.query().findById(id)
        if (!treatmentExists) {
            return { status: 404, message: "Treatment not found" };
        }
        await Prescription.query().delete().where('treatment_id', id);
        const treatment = await Treatment.query().deleteById(id);
        return { status: 200, treatment };
    } catch (err) {
        console.log("ERROR >>>>> ", err)
        return { status: 400, message: err.message };
    }
}