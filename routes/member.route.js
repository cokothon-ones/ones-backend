const express = require('express');
const asyncHandler = require('express-async-handler');

const { addMember } = require('../controllers/member.controller.js');

const memberRouter = express.Router();

memberRouter.post('/:capsuleId', asyncHandler(addMember));

module.exports = memberRouter;