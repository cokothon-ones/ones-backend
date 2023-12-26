const express = require("express");
const asyncHandler = require("express-async-handler");

const { makeImgItem } = require("../controllers/photo_item.controller.js");

export const photoItemRouter = express.Router();

PhotoItemRouter.post("/item/photo", asyncHandler(makePhotoItem));

module.exports = PhotoItemRouter;
