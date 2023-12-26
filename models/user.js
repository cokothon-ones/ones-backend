const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },

        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "User",
        tableName: "user",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
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
