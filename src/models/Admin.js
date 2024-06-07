const { Model } = require('objection');
const User = require('./User');

class Admin extends Model {
    static get tableName() {
        return 'admins';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'admins.user_id',
                    to: 'users.id',
                },
            },
        };
    }
}

module.exports = Admin;
