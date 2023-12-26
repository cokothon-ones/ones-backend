const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const { BaseError } = require("sequelize");
const status = require("../config/response.status");

exports.join = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }

    const hash = await bcrypt.hash(password, 12); //숫자가 높을수록 보안에 좋지만 느려짐 12정도가 적당!
    await User.create({
      email,
      password: hash,
    });
    return res.send("join");
  } catch (error) {
    console.error(error);
    throw new BaseError(status.INTERNAL_SERVER_ERROR);
  }
};
