const { Model } = require('objection');

class Prescription extends Model {
    static get tableName() {
        return 'prescriptions';
    }

    static get relationMappings() {
        return {
            treatment: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./Treatment'),
                join: {
                    from: 'prescriptions.treatment_id',
                    to: 'treatments.id',
                },
            },
        };
    }
}

module.exports = Prescription;
