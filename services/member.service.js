const createMember = async (body) => {
    try {
    } catch (err) {
        console.error(err);
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
};

module.exports = { createMember };
