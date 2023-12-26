const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  addMember,
  authLocation,
} = require("../controllers/member.controller.js");

const memberRouter = express.Router();

memberRouter.post("/:capsuleId", asyncHandler(addMember));
memberRouter.patch("/auth", asyncHandler(authLocation));

module.exports = memberRouter;
