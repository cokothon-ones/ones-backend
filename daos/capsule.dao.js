const { Capsule, Member, TextItem, PhotoItem } = require('../models');
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
    await Member.create({
        capsule_id: capsule.dataValues.id,
        user_id: userId,
        location_verified: 0,
    });
    return capsule;
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

exports.selectAllCapsule = async (userId) => {
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

exports.selectCapsule = async (userId, capsuleId) => {
    return Capsule.findOne({
        where: {
            id: capsuleId,
        },
        include: {
            model: Member,
            where: {
                user_id: userId,
            },
        },
    });
};

exports.updateAuthTime = async (capsule, authTime) => {
    capsule.auth_time = authTime;
    capsule.save();
};

exports.deleteCapsule = async (capsule) => {
    TextItem.destroy({
        where: {
            capsule_id: capsule.id,
        },
    });
    PhotoItem.destroy({
        where: {
            capsule_id: capsule.id,
        },
    });
    capsule.destroy();
};

exports.hasItem = async (capsuleId) => {
    const capsule = await Capsule.findByPk(capsuleId, {
        include: [
            { model: TextItem, required: false },
            { model: PhotoItem, required: false },
        ],
    });
    return !!(capsule && (capsule.TextItems.length > 0 || capsule.PhotoItems.length > 0));
};
