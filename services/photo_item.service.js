const { status } = require("../config/response.status");
const { BaseError } = require("../config/error.js");

const { insertPhotoItem } = require("../daos/photo_item.dao");

const createPhotoItem = async (userId, body, photoUrl) => {
  try {
    const item = await insertPhotoItem(userId, body.capsule_id, photoUrl);
    return;
  } catch (err) {
    console.error(err);
    if (err instanceof BaseError) {
      throw err;
    }
  }
};

module.exports = { createPhotoItem };
