const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

// create a new User
router.post('/', userController.createUser);

router.get("/login", userController.loginUser);

// logout user from current device
router.get("/logout", auth, userController.logoutUser);

router.route("/me")
	.all(auth) // auth middleware for all the below user routes 
	.get(userController.readUser) // return user profile
	.patch(userController.updateUser)
	.delete(userController.deleteUser); 

module.exports = router
