const { Model } = require('objection');

class Patient extends Model {
    static get tableName() {
        return 'patients';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'patients.user_id',
                    to: 'users.id',
                },
            },
            appointment: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Appointment',
                join: {
                    from: 'patients.id',
                    to: 'appointments.patient_id',
                },
            },
        };
    }
}

module.exports = Patient;
