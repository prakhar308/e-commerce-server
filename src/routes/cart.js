const router = require("express").Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");

// require authentication for all routes
router.all("*", auth)

router
	.get("/", cartController.getProductsInCart)
	.post("/add", cartController.addToCart)
	.put("/update", cartController.updateCart)
	.put("/remove", cartController.removeFromCart)
   .get("/clear", cartController.clearCart)

module.exports = router;