const { Capsule, Member } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.insertCapsule = async (userId, data) => {
    const code = uuidv4();
    const capsule = await Capsule.create({
        title: data.title,
        date: data.date,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        code: code,
    });
    Member.create({
        capsule_id: capsule.dataValues.id,
        user_id: userId,
        location_verified: 0,
    });
    return code;
};

exports.validateCode = async (capsuleId, userCode) => {
    const code = await getCode(capsuleId);
    return code == userCode;
};

const getCode = async (capsuleId) => {
    const capsule = await Capsule.findOne({
        raw: true,
        where: {
            id: capsuleId,
        },
        attributes: ['code'],
    });
    return capsule.code;
};

exports.selectCapsule = async (userId) => {
    return Capsule.findAll({
        raw: true,
        include: {
            model: Member,
            where: {
                user_id: userId,
            },
        },
    });
};
