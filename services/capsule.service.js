const { BaseError } = require('sequelize');
const status = require('../config/response.status');

const createCapsule = async (body) => {
    try {
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
