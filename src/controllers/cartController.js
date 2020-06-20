const db = require("../models/");
const mongoose = require('mongoose')

exports.getProductsInCart = async (req, res) => {
	try {
		// populate product details in cart
		await req.user.populate({
			path: "cart.productId",
			select: ["img", "name", "price"]	
		}).execPopulate();

		const userObject = req.user.toObject();

		const cart = userObject.cart.map((i) => {
			return {
				...i.productId,
				qty: i.qty
			}
		})

		res.status(200).send(cart);
	} catch(e) {
		res.status(500).send({message: e.message})
	}
}

// add product to cart
exports.addToCart = async (req, res) => {
	try {
		req.user.cart.push(req.body);
		await req.user.save();
		
		// 
		let cartItem = await db.Product.findById(
											{_id: req.body.productId},
											'name img price'
										);
		
		cartItem = cartItem.toObject();	
		// add qty field in object
		cartItem = {...cartItem, qty: req.body.qty}

		// if product found
		if(cartItem)
			res.status(201).send(cartItem);
		else
			res.status(500).send({message: "cannot add product to cart"});

	} catch(e) {
		res.status(500).send({message: e.message})
	}
}

// update product quantity in cart
exports.updateCart = async (req, res) => {
	try {
		//convert mongoose object to raw object
		const userObject = req.user.toObject();
		const cart = userObject.cart.map((item) => (
			(item.productId == req.body.productId) ? {...item, qty: req.body.qty} : item
		))
		req.user.cart = cart;
		await req.user.save();
		res.status(200).send();
	} catch(e) {
		res.status(500).send({message: e.message});
	}
}

// remove product from cart
exports.removeFromCart = async (req, res) => {
	try {
		// filter out products whose id don't match with
		// the id of the product to be removed
		const cart = req.user.cart.filter((item) => {
			return item.productId != req.body.productId;
		})
		req.user.cart = cart;
		await req.user.save();
		res.status(200).send();
	} catch(e) {
		res.status(500).send({message: e.message});
	}	
}

// clear all items in cart
exports.clearCart = async (req, res) => {
	try {
		req.user.cart = [];
		await req.user.save();
		res.status(200).send();
	} catch (e) {
		res.status(500).send({message: e.message})
	}
}