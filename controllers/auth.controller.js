const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const { BaseError } = require("../config/error");
const status = require("../config/response.status");

exports.join = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      throw new BaseError(status.LREADY_EXIST_MEMBER_ERROR);
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

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?error=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.send("success!");
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout(() => {
    res.send("logout success!");
  });
};
