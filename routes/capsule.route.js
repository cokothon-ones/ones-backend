const express = require('express');
const asyncHandler = require('express-async-handler');

const { makeCapsule, fetchCapsule, authCapsule } = require('../controllers/capsule.controller.js');

const capsuleRouter = express.Router();

capsuleRouter.post('/', asyncHandler(makeCapsule));
capsuleRouter.get('/', asyncHandler(fetchCapsule));
capsuleRouter.patch('/auth', asyncHandler(authCapsule));

module.exports = capsuleRouter;
