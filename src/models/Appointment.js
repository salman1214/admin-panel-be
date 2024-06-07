const { Model } = require('objection');
const User = require('./User');

class Appointment extends Model {
    static get tableName() {
        return 'appointments';
    }

    // static get relationMappings() {
    //     return {
    //         user: {
    //             relation: Model.BelongsToOneRelation,
    //             modelClass: User,
    //             join: {
    //                 from: 'appointments.user_id',
    //                 to: 'users.id',
    //             },
    //         },
    //     };
    // }


    // one to many relation with doctors
    static get relationMappings() {
        return {
            doctors: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Doctor',
                join: {
                    from: 'appointments.id',
                    to: 'doctors.appointment_id'
                }
            }
        }
    }
    
    // one to many relation with patients
    static get relationMappings() {
        return {
            patients: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Patient',
                join: {
                    from: 'appointments.id',
                    to: 'patients.appointment_id'
                }
            }
        }
    }
}

module.exports = Appointment;
