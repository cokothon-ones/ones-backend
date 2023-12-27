const { PhotoItem } = require("../models");
const { status } = require("../config/response.status");
const { BaseError } = require("../config/error");

exports.insertPhotoItem = async (userId, capsuleId, data) => {
  // 텍스트 저장 관련 로직
  const item = await PhotoItem.findOne({
    raw: true,
    where: {
      capsule_id: capsuleId,
      user_id: userId,
    },
  });
  if (item) {
    throw new BaseError(status.ALREADY_EXIST_MEMBER_ERROR);
  }

  return PhotoItem.create({
    capsule_id: capsuleId,
    user_id: userId,
    data: data,
  });
};
