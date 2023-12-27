const { response } = require("../config/response");
const { status } = require("../config/response.status");

const {
  createCapsule,
  findCapsule,
  updateCapsule,
} = require("../services/capsule.service");

exports.makeCapsule = async (req, res, next) => {
  res.send(
    response(status.SUCCESS, await createCapsule(req.user.id, req.body))
  );
};

exports.fetchCapsule = async (req, res, next) => {
  res.send(response(status.SUCCESS, await findCapsule(req.user.id)));
};

exports.authCapsule = async (req, res, next) => {
  res.send(
    response(status.SUCCESS, await updateCapsule(req.user.id, req.body))
  );
};
