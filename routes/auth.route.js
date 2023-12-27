const express = require("express");
const router = express.Router();
const { join, login, logout } = require("../controllers/auth.controller");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/loginAuth");

// /auth/join
router.post("/join", isNotLoggedIn, join);
// /auth/login
router.post("/login", isNotLoggedIn, login);
// /auth/logout
router.get("/logout", isLoggedIn, logout);

module.exports = router;
