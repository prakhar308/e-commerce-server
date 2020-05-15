const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.route("/")
	// create a new product
	.post(productController.createProduct)
	// get/filter/sort products
	.get(productController.getProducts);

module.exports = router;