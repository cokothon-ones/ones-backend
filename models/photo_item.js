const Sequelize = require('sequelize');

class PhotoItem extends Sequelize.Model {
    static initiate(sequelize) {
        PhotoItem.init(
            {
                data: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: 'PhotoItem',
                tableName: 'photo_item',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }
    static associate(db) {
        db.PhotoItem.belongsTo(db.Capsule, { foreignKey: 'capsule_id' });
        db.PhotoItem.belongsTo(db.User, { foreignKey: 'user_id' });
    }
}

module.exports = PhotoItem;
