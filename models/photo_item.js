const Sequelize = require("sequelize");

class PhotoItem extends Sequelize.Model {
  static initiate(sequelize) {
    PhotoItem.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        data: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "PhotoItem",
        tableName: "photo_item",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    // db.PhotoItem.belongsTo(db.Capsule, { foreignKey: "capsule_id" });
  }
}

module.exports = PhotoItem;
