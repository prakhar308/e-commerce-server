const router = require("express").Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");

router.route("/")
	.all(auth)
	.get(cartController.getItemsInCart)
	.post(cartController.saveCart);

module.exports = router;