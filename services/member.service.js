const { status } = require("../config/response.status");
const { BaseError } = require("../config/error.js");
const { Member } = require("../models");

const {
  insertMember,
  checkEachLocation,
  isMember,
  hasUnverifiedMember,
} = require("../daos/member.dao");
const { selectCapsule } = require("../daos/capsule.dao.js");

const createMember = async (userId, params, body) => {
  try {
    const member = await insertMember(userId, params.capsuleId, body.code);
    return;
  } catch (err) {
    console.error(err);
    if (err instanceof BaseError) {
      throw err;
    }
  }
};

const validateLocation = async (userId, body) => {
  try {
    /*const capsule = await selectCapsule(userId, body.capsuleId);

    if (capsule === null) {
      throw new BaseError(status.INVALID_MEMBER_ERROR);
    }

    const within500m = isWithin500m(
      body.latitude,
      body.longitude,
      capsule.dataValues.latitude,
      capsule.dataValues.longitude
    );

    if (!within500m) {
      throw new BaseError(status.INVALID_CODE_ERROR);
    }

    const member = await Member.findOne({
      where: {
        capsule_id: body.capsuleId,
        user_id: userId,
      },
    });

    await checkEachLocation(member); */

    const result = await hasUnverifiedMember(body.capsuleId);
    return !result;
  } catch (err) {
    console.error(err);
    if (err instanceof BaseError) {
      throw err;
    }
  }
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const isWithin500m = (userLat, userLon, targetLat, targetLon) => {
  const distance = calculateDistance(userLat, userLon, targetLat, targetLon);
  return distance <= 0.5; // 거리가 0.5km(500m) 이내에 있으면 true, 그렇지 않으면 false 반환
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // 지구 반지름 (단위: km)

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // 결과: 두 지점 간의 거리 (단위: km)
  return distance;
};

module.exports = { createMember, validateLocation };
