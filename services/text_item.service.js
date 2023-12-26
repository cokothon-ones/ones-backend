const { status } = require("../config/response.status");
const { BaseError } = require("../config/error.js");

const { insertTextItem } = require("../daos/text_item.dao");

const createTextItem = async (userId, body) => {
  try {
    const item = await insertTextItem(userId, body.capsuleId, body.data);
    return;
  } catch (err) {
    console.error(err);
    if (err instanceof BaseError) {
      throw err;
    }
  }
};

module.exports = { createTextItem };
