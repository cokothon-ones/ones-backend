const Sequelize = require('sequelize');

class Member extends Sequelize.Model {
    static initiate(sequelize) {
        Member.init(
            {
                location_verified: {
                    type: Sequelize.TINYINT(1),
                    allowNull: false,
                    default: 0,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: true,
                modelName: 'Member',
                tableName: 'member',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }
    static associate(db) {
        db.Member.belongsTo(db.Capsule, { foreignKey: 'capsule_id' });
    }
}

module.exports = Member;
