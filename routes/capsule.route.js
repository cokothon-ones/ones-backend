const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  makeCapsule,
  fetchCapsule,
  authCapsule,
  fetchItem,
} = require("../controllers/capsule.controller.js");

const capsuleRouter = express.Router();

capsuleRouter.post("/", asyncHandler(makeCapsule));
capsuleRouter.get("/", asyncHandler(fetchCapsule));
capsuleRouter.patch("/auth", asyncHandler(authCapsule));
capsuleRouter.get("/:capsule_id", asyncHandler(fetchItem));

module.exports = capsuleRouter;
