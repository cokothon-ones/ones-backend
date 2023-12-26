const { status } = require('../config/response.status');
const { BaseError } = require('../config/error.js');

const { insertMember } = require('../daos/member.dao');

const createMember = async (userId, params, body) => {
    try {
        const member = await insertMember(userId, params.capsuleId, body.code);
        return;
    } catch (err) {
        console.error(err);
        if (err instanceof BaseError) {
            throw err;
        }
    }
};

module.exports = { createMember };
