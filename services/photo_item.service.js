const { status } = require("../config/response.status");
const { BaseError } = require("../config/error.js");

const { insertPhotoItem } = require("../daos/photo_item.dao");

const createPhotoItem = async (userId, body) => {
  try {
    const item = await insertPhotoItem(userId, body.capsuleId, body.data);
    return;
  } catch (err) {
    console.error(err);
    if (err instanceof BaseError) {
      throw err;
    }
  }
};

module.exports = { createPhotoItem };
