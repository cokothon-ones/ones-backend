const { response } = require('../config/response');
const { status } = require('../config/response.status');

const { createMember } = require('../services/member.service');

const addMember = async (req, res, next) => {
    res.send(response(status.SUCCESS, await createMember(req.user.id, req.body)));
};

module.exports = { addMember };
