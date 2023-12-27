const { status } = require('../config/response.status');
const { BaseError } = require('../config/error.js');

const { insertMember } = require('../daos/member.dao');

const createMember = async (userId, body) => {
    try {
        await insertMember(userId, body.code);
        return;
    } catch (err) {
        console.error(err);
        if (err instanceof BaseError) {
            throw err;
        }
    }
};

module.exports = { createMember };
