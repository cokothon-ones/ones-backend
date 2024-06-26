const express = require("express");
const asyncHandler = require("express-async-handler");

const { makeTextItem } = require("../controllers/text_item.controller.js");
const { makePhotoItem } = require("../controllers/photo_item.controller.js");
const { uploadPhoto } = require("../services/photoStorage.service.js");

const itemRouter = express.Router();

// itemRouter.post("/:capsuledId/text", asyncHandler(makeTextItem));
itemRouter.post("/text", asyncHandler(makeTextItem));
itemRouter.post("/photo", asyncHandler(uploadPhoto));

module.exports = itemRouter;
