const { Model } = require('objection');
const Patient = require('./Patient');
const Prescription = require('./Prescription');

class Treatment extends Model {
    static get tableName() {
        return 'treatments';
    }

    static get relationMappings() {
        return {
            patient: {
                relation: Model.BelongsToOneRelation,
                modelClass: Patient,
                join: {
                    from: 'treatments.patient_id',
                    to: 'patients.id',
                },
            },
            prescription: {
                relation: Model.HasOneRelation,
                modelClass: Prescription,
                join: {
                    from: 'treatments.id',
                    to: 'prescriptions.treatment_id',
                },
            },
        };
    }
}

module.exports = Treatment;
