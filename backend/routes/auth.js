var express = require("express");
var router = express.Router();
var authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/register", authController.register);
module.exports = router;
