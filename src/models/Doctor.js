const { Model } = require('objection');

class Doctor extends Model {
    static get tableName() {
        return 'doctors';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'doctors.user_id',
                    to: 'users.id',
                },
            },
            appointment: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Appointment',
                join: {
                    from: 'doctors.id',
                    to: 'appointments.doctor_id',
                },
            },
        };
    }
}

module.exports = Doctor;
