const db = require("../models/");

exports.getItemsInCart = async (req, res) => {
	try {
		// populate product details in cart
		await req.user.populate({
			path: "cart.product",
			select: ["img", "name", "price"]	
		}).execPopulate();

		const userObject = req.user.toObject();

		const cart = userObject.cart.map((i) => {
			return {
				...i.product,
				qty: i.qty
			}
		})

		res.status(200).send(cart);
	} catch(e) {
		res.status(500).send({message: e.message})
	}
}

exports.saveCart = async (req, res) => {
	try {
		// save items in cart
		req.user.cart = req.body;
		await req.user.save();

		res.status(200).send(req.user.cart);
	} catch(e) {
		res.status(500).send({message: e.message})
	}
}