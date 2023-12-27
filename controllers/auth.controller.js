const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const { BaseError } = require("../config/error");
const { status } = require("../config/response.status");
const { response } = require("../config/response");

exports.join = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      console.log(status.SUCCESS);
      throw new BaseError(status.ALREADY_EXIST_MEMBER_ERROR);
    }

    const hash = await bcrypt.hash(password, 12); //숫자가 높을수록 보안에 좋지만 느려짐 12정도가 적당!
    await User.create({
      email,
      password: hash,
    });
    return res.send(response(status.SUCCESS, req.body.email));
  } catch (error) {
    console.error(error);
    res
      .status(error.data.status || status.INTERNAL_SERVER_ERROR)
      .send(response(error.data));
  }
};

exports.login = (req, res, next) => {
  return passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
    if (!user) {
      return res.send(response(status.INVALID_CODE_ERROR, info.message)); // 로직(인증 과정) 실패
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return res
          .status(status.INTERNAL_SERVER_ERROR)
          .send(response(loginError));
      }
      return res.send(response(status.SUCCESS, req.user));
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout(() => {
    return res.send(response(status.SUCCESS, "logout success"));
  });
};
