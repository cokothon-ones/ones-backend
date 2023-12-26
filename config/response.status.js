const StatusCodes = require('http-status-code');

const status = {
    //success
    SUCCESS: { status: StatusCodes.OK, message: 'success' },

    //fail
    INTERNAL_SERVER_ERROR: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'error: 서버 에러',
    },
    NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        message: 'error: NOT FOUND',
    },
};

module.exports = status;
