const { response } = require('../config/response');
const { status } = require('../config/response.status');

const { createCapsule, findCapsule, updateCapsule } = require('../services/capsule.service');

const makeCapsule = async (req, res, next) => {
    // res.send(response(status.SUCCESS, await createCapsule(req.user.id, req.body)));
    res.send(response(status.SUCCESS, await createCapsule(1, req.body)));
};

const fetchCapsule = async (req, res, next) => {
    res.send(response(status.SUCCESS, await findCapsule(req.query)));
};

const authCapsule = async (req, res, next) => {
    res.send(response(status.SUCCESS, await updateCapsule(req.body)));
};

module.exports = { makeCapsule, fetchCapsule };
