const { response } = require('../config/response');
const { status } = require('../config/response.status');

const { createTextItem } = require('../services/text_item.service');

const makeTextItem = async (req, res, next) => {
    res.send(response(status.SUCCESS, await createTextItem(req.user.id, req.body)));
};

module.exports = { makeTextItem };
