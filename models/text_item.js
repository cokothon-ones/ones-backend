const Sequelize = require('sequelize');

class TextItem extends Sequelize.Model {
    static initiate(sequelize) {
        TextItem.init(
            {
                data: {
                    type: Sequelize.STRING(1000),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: 'TextItem',
                tableName: 'text_item',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }
    static associate(db) {
        db.TextItem.belongsTo(db.Capsule, { foreignKey: 'capsule_id' });
        db.TextItem.belongsTo(db.User, { foreignKey: 'user_id' });
    }
}

module.exports = TextItem;
