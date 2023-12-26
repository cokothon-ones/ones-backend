const { status } = require('../config/response.status');
const { BaseError } = require('../config/error');

const { insertCapsule, selectCapsule } = require('../daos/capsule.dao');
const { findCapsuleResponseDTO } = require('../dtos/find-capsule.dto');

exports.createCapsule = async (userId, body) => {
    try {
        const code = await insertCapsule(userId, body);
        //캡슐 잠금 시간이 되었을 때 item이 0개라면 삭제
        //캡슐 오픈 달이 지났는데 캡슐을 오픈하지 않았다면 삭제
        return code;
    } catch (err) {
        console.error(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

exports.findCapsule = async (userId) => {
    try {
        const capsules = await selectCapsule(userId);
        console.log(capsules);
        return findCapsuleResponseDTO(capsules);
    } catch (err) {
        console.error(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

exports.updateCapsule = async (body) => {
    try {
    } catch (err) {
        console.error(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};
