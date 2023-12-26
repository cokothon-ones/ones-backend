const express = require("express");
const router = express.Router();
const { join, login } = require("../controllers/auth.controller");

// /auth/join
router.post("/join", join);
// /auth/login
router.post("/login", login);

module.exports = router;
