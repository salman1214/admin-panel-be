const { Model } = require('objection');
const Doctor = require('./Doctor');
const Patient = require('./Patient');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            doctor: {
                relation: Model.HasManyRelation,
                modelClass: Doctor,
                join: {
                    from: 'users.id',
                    to: 'doctors.user_id'
                }
            },
            patient: {
                relation: Model.HasManyRelation,
                modelClass: Patient,
                join: {
                    from: 'users.id',
                    to: 'patients.user_id'
                }
            }
        }
    }
}

module.exports = User;
