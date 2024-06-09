const { Model } = require('objection');

class Appointment extends Model {
    static get tableName() {
        return 'appointments';
    }

    // one to many relation with doctors
    static get relationMappings() {
        return {
            doctor: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Doctor',
                join: {
                    from: 'appointments.doctor_id',
                    to: 'doctors.id'
                }
            },
            patient: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Patient',
                join: {
                    from: 'appointments.patient_id',
                    to: 'patients.id'
                }
            }
        }
    }
}

module.exports = Appointment;
