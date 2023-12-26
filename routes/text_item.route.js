const express = require("express");
const asyncHandler = require("express-async-handler");

const { makeTextItem } = require("../controllers/text_item.controller.js");

export const TextItemRouter = express.Router();

TextItemRouter.post("/item/text", asyncHandler(makeTextItem));

module.exports = TextItemRouter;
