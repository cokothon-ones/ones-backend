const express = require("express");
const router = express.Router();
const { join } = require("../controllers/auth.controller");

// /auth/join
router.post("/join", join);

module.exports = router;
