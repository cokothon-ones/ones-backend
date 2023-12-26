const { status } = require('../config/response.status');
const { BaseError } = require('../config/error');

const { insertCapsule, selectAllCapsule, selectCapsule, updateAuthTime } = require('../daos/capsule.dao');
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
        const capsules = await selectAllCapsule(userId);
        console.log(capsules);
        return findCapsuleResponseDTO(capsules);
    } catch (err) {
        console.error(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

exports.updateCapsule = async (userId, body) => {
    try {
        const capsule = await selectCapsule(userId, body.capsuleId);
        console.log(capsule);
        if (capsule === null) {
            throw new BaseError(status.INVALID_MEMBER_ERROR);
        }

        const isValid = validateAuthTime(capsule.auth_time, body.authTime);
        if (!isValid) {
            throw new BaseError(status.INSUFFICIENT_AUTHTIME_DIFFERENCE_ERROR);
        }
        await updateAuthTime(capsule, body.authTime);
        return;
    } catch (err) {
        console.error(err);
        if (err instanceof BaseError) {
            throw err;
        }
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

const validateAuthTime = (previous, current) => {
    if (!previous) {
        return true;
    }

    if (current) {
        const previousTimestamp = new Date(previous).getTime();
        const currentTimestamp = new Date(current).getTime();
        const timeDiff = (currentTimestamp - previousTimestamp) / (1000 * 60);
        return timeDiff > 10;
    }
    return false;
};
