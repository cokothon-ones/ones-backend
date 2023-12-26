const response = require("../config/response");

const status = require("../config/response.status");

const { createPhotoItem } = require("../services/photo_item.service");

const makePhotoItem = async (req, res, next) => {
  res.send(response(status.SUCCESS, await createPhotoItem(req.body)));
};

module.exports = { makePhotoItem };
