const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

// create a new User
router.post('/', userController.createUser);

router.post("/login", userController.loginUser);

// logout user from current device
router.post("/logout", auth, userController.logoutUser);

// logout user from all devices
router.post("/logoutAll", auth, userController.logoutAll);

router.route("/me")
	.all(auth) // auth middleware for all the below user routes 
	.get(userController.readUser) // return user profile
	.patch(userController.updateUser)
	.delete(userController.deleteUser); 

module.exports = router
