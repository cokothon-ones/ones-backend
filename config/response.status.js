import { StatusCodes } from "http-status-codes";

const status = {
  //success
  SUCCESS: { status: StatusCodes.OK, message: "success" },

  //conflict

  CONFLICT: {
    status: StatusCodes.CONFLICT,
    message: "error: 이미 가입된 사용자입니다",
  },

  //fail
  INTERNAL_SERVER_ERROR: {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "error: 서버 에러",
  },
  NOT_FOUND: {
    status: StatusCodes.NOT_FOUND,
    message: "error: NOT FOUND",
  },
};

module.exports = status;
