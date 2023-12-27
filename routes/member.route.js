const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  addMember,
  authLocation,
} = require("../controllers/member.controller.js");

const memberRouter = express.Router();

memberRouter.patch("/auth", asyncHandler(authLocation));
memberRouter.post("/", asyncHandler(addMember));

module.exports = memberRouter;
