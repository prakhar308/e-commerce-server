const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.route("/")
	// create a new product
	.post(productController.createProduct)
	// filter products on the basis of category
	.get(productController.getProducts);
	
router.get("/:category", productController.filterProducts);

module.exports = router;