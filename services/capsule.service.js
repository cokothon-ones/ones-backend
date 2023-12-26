const { status } = require('../config/response.status');
const { BaseError } = require('../config/error');

const { insertCapsule } = require('../daos/capsule.dao');

const createCapsule = async (userId, body) => {
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

const findCapsule = async (body) => {
    try {
    } catch (err) {
        console.error(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

const updateCapsule = async (body) => {
    try {
    } catch (err) {
        console.error(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

module.exports = { createCapsule, findCapsule, updateCapsule };
