const Sequelize = require('sequelize');

class Capsule extends Sequelize.Model {
    static initiate(sequelize) {
        Capsule.init(
            {
                title: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                auth_time: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                location: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                latitude: {
                    type: Sequelize.FLOAT,
                    allowNull: false,
                },
                longitude: {
                    type: Sequelize.FLOAT,
                    allowNull: false,
                },
                code: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: 'Capsule',
                tableName: 'capsule',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }
    static associate(db) {
        db.Capsule.hasMany(db.Member, { foreignKey: 'capsule_id' });
        // db.Capsule.hasMany(db.TextItem, { foreignKey: 'capsule_id' });
        // db.Capsule.hasMany(db.PhotoItem, { foreignKey: 'capsule_id' });
    }
}

module.exports = Capsule;
