const express = require("express");
const router = express.Router();

const LoginController = require("../controllers/login");
// const wrapAsync = require("../utils/wrapAsync");

router.route("/").get(LoginController.authentication);

module.exports = router;
