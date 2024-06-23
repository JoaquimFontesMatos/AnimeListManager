var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController.js");
var authController = require("../controllers/authController.js");

/**
 * Get List of Users in Database
 */
router.get("/users", authController.verifyToken, userController.getAllUsers);

/**
 * Get the User with the given Id from the Database
 */
router.get(
  "/user",
  authController.verifyToken,
  userController.getUserById,
  userController.getOneUser
);

/**
 * Update the User with the given Id from the Database
 */
router.put("/user", authController.verifyToken, userController.updateUser);

/**
 * Delete the User with the given Id from the Database
 */
router.delete(
  "/user",
  authController.verifyToken,
  userController.getUserById,
  userController.deleteUser
);

module.exports = router;
