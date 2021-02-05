const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const userController = require("../controllers/user.controller");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);

module.exports = router;
