const { status } = require('../config/response.status');
const { BaseError } = require('../config/error');

const {
    insertCapsule,
    selectAllCapsule,
    selectCapsule,
    updateAuthTime,
    deleteCapsule,
    hasItem,
} = require('../daos/capsule.dao');
const { hasUnverifiedMember } = require('../daos/member.dao');
const { findCapsuleResponseDTO } = require('../dtos/find-capsule.dto');

exports.createCapsule = async (userId, body) => {
    try {
        const capsule = await insertCapsule(userId, body);

        setTimeout(() => {
            deleteEmptyCapsule(capsule);
        }, capsule.createdAt.getTime() + 24 * 60 * 60 * 1000 - Date.now());
        setTimeout(() => {
            deleteExpiredCapsule(capsule);
        }, calculateNextMonth(new Date(capsule.date)) - Date.now());

        return capsule.dataValues.code;
    } catch (err) {
        console.error(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

const calculateNextMonth = (date) => {
    const nextMonthDate = new Date(date);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    nextMonthDate.setDate(1);
    return nextMonthDate.getTime();
};

const deleteEmptyCapsule = async (capsule) => {
    try {
        const existent = await hasItem(capsule.id);
        if (!existent) {
            deleteCapsule(capsule);
        }
    } catch (err) {
        console.log(err);
    }
};

const deleteExpiredCapsule = async (capsule) => {
    try {
        const unverified = await hasUnverifiedMember(capsule.id);
        if (unverified) {
            deleteCapsule(capsule);
        }
    } catch (err) {
        console.log(err);
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
