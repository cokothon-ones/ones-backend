const { TextItem } = require("../models");
const { status } = require("../config/response.status");
const { BaseError } = require("../config/error");

exports.insertTextItem = async (userId, capsuleId, data) => {
  return TextItem.create({
    capsule_id: capsuleId,
    user_id: userId,
    data: data,
  });
};
