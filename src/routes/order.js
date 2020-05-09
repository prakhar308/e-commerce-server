const router = require("express").Router();
const auth = require("../middleware/auth");
const orderController = require("../controllers/orderController");

router.route("/")
	.all(auth)
	.post(orderController.createOrder)
	.get(orderController.getOrders)

module.exports = router;