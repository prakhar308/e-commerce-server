const db = require("../models");

exports.createProduct = async (req, res) => {
	try {
		const product = new db.Product(req.body);
		await product.save();
		res.status(201).send(product);
	} catch(e) {
		res.status(500).send({message : e.message})
	}
}

exports.getProducts = async (req, res) => {
	try {
		const products = await db.Product.find();
		res.status(200).send(products);
	} catch(e) {
		res.status(500).send({message: "Cannot find products"})
	}
}

exports.filterProducts = async (req, res) => {
	try {
		const products = await db.Product.find({category: req.params.category});
		res.status(200).send(products);
	} catch(e) {
		res.status(500).send({message: e.message});
	}
}