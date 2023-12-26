const express = require("express");
const asyncHandler = require("express-async-handler");

const { makeTextItem } = require("../controllers/text_item.controller.js");

const itemRouter = express.Router();

// itemRouter.post("/:capsuledId/text", asyncHandler(makeTextItem));
itemRouter.post("/text", asyncHandler(makeTextItem));

module.exports = itemRouter;
