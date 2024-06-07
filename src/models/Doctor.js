const { Model } = require('objection');
const User = require('./User');

class Doctor extends Model {
    static get tableName() {
        return 'doctors';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'doctors.user_id',
                    to: 'users.id',
                },
            },
        };
    }
}

module.exports = Doctor;
