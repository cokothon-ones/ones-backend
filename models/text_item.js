const Sequelize = require("sequelize");

class TextItem extends Sequelize.Model {
  static initiate(sequelize) {
    TextItem.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        data: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "TextItem",
        tableName: "text_item",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    // db.TextItem.belongsTo(db.Capsule, { foreignKey: "capsule_id" });
  }
}

module.exports = TextItem;
