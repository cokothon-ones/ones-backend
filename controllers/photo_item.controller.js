const { response } = require("../config/response");

const { status } = require("../config/response.status");

const { createPhotoItem } = require("../services/photo_item.service");

const makePhotoItem = async (req, res, photoUrl, next) => {
  res.send(
    response(
      status.SUCCESS,
      await createPhotoItem(req.user.id, req.body, photoUrl)
    )
  );
};

module.exports = { makePhotoItem };
