const { Member } = require('../models');
const { status } = require('../config/response.status');
const { BaseError } = require('../config/error');

const { validateCode } = require('./capsule.dao');

exports.insertMember = async (userId, capsuleId, code) => {
    const isValid = await validateCode(capsuleId, code);
    if (!isValid) {
        throw new BaseError(status.INVALID_CODE_ERROR);
    }

    const member = await Member.findOne({
        raw: true,
        where: {
            capsule_id: capsuleId,
            user_id: userId,
        },
    });
    if (member) {
        throw new BaseError(status.ALREADY_EXIST_MEMBER_ERROR);
    }

    return Member.create({
        capsule_id: capsuleId,
        user_id: userId,
        location_verified: 0,
    });
};

exports.hasUnverifiedMember = async (capsuleId) => {
    const member = await Member.findOne({
        where: {
            capsule_id: capsuleId,
            location_verified: 0,
        },
    });
    return !!member;
};
