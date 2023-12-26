const express = require("express");
const router = express.Router();
const { join, login } = require("../controllers/auth.controller");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/loginAuth");

// /auth/join
router.post("/join", isNotLoggedIn, join);
// /auth/login
router.post("/login", isNotLoggedIn, login);

module.exports = router;
