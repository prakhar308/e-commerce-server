const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.route("/")
	// create a new product
	.post(productController.createProduct)
	// get/filter/sort products
	// The query for sorting or filtering can be written as:
	// ?sort=price:desc&category=Fruits&page=1
	// OR
	// ?sort=price:asc&category=Vegatables
	.get(productController.getProducts);

module.exports = router;