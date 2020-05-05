const express = require('express');
const router = express.Router();
const db = require("../models")

// create a new product
router.post("/products", async (req, res) => {
	try {
		const product = new db.Product(req.body);
		await product.save();
		res.status(201).send(product);
	} catch(e) {
		res.status(500).send({message : e.message})
	}
})

// get all products
router.get("/products", async (req, res) => {
	try {
		const products = await db.Product.find();
		res.status(200).send(products);
	} catch(e) {
		res.status(500).send({message: "Cannot find products"})
	}
})

// filter products on the basis of category
router.get("/products/:category", async (req, res) => {
	try {
		const products = await db.Product.find({category: req.params.category});
		res.status(200).send(products);
	} catch(e) {
		res.status(500).send({message: e.message});
	}
})

module.exports = router;