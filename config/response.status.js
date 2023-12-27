import { StatusCodes } from "http-status-codes";

export const status = {
  //success
  SUCCESS: { status: StatusCodes.OK, message: "success" },

  //error
  INTERNAL_SERVER_ERROR: {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "error: 서버 에러",
  },
  NOT_FOUND: {
    status: StatusCodes.NOT_FOUND,
    message: "error: NOT FOUND",
  },

  //fail
  INVALID_CODE_ERROR: {
    status: StatusCodes.BAD_REQUEST,
    message: "fail: 유효하지 않은 코드",
  },
  ALREADY_EXIST_MEMBER_ERROR: {
    status: StatusCodes.BAD_REQUEST,
    message: "fail: 이미 존재하는 멤버",
  },
  INVALID_MEMBER_ERROR: {
    status: StatusCodes.BAD_REQUEST,
    message: "fail: 존재하지 않는 멤버",
  },
  INSUFFICIENT_AUTHTIME_DIFFERENCE_ERROR: {
    status: StatusCodes.BAD_REQUEST,
    message: "fail: 이전 인증 시작 시간과의 차이가 10분 미만",
  },
};
