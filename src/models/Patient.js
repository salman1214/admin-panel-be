const { Model } = require('objection');
const User = require('./User');

class Patient extends Model {
    static get tableName() {
        return 'patients';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'patients.user_id',
                    to: 'users.id',
                },
            },
        };
    }
}

module.exports = Patient;
