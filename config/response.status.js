import { StatusCodes } from "http-status-codes";

export const status = {
  //success
  SUCCESS: { status: StatusCodes.OK, message: "success" },

  //fail
  INTERNAL_SERVER_ERROR: {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "error: 서버 에러",
  },
  NOT_FOUND: {
    status: StatusCodes.NOT_FOUND,
    message: "error: NOT FOUND",
  },

  ALREADY_EXIST_MEMBER_ERROR: {
    status: StatusCodes.BAD_REQUEST,
    message: "fail: 이미 존재하는 사용자",
  },
};

module.exports = status;
