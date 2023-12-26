const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init(
            {
                name: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
                gender: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
                birth: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                address: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                address_detail: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
                email: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    unique: true,
                },
                phone: {
                    type: Sequelize.STRING(15),
                    allowNull: true,
                    unique: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: 'User',
                tableName: 'user',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }
    static associate(db) {
        // db.User.belongsToMany(db.FoodType, { through: 'UserFoodType' });
        // db.User.belongsToMany(db.Mission, { through: db.UserMission });
        // db.User.hasMany(db.Review, { foreignKey: 'user_id' });
    }
}

module.exports = User;
