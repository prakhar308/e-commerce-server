const db = require("../models/");

exports.createOrder = async (req, res) => {
	try {
		// update instock quantity of every product in order
		let productQtyUpdatePromises = req.body.products.map((product) => {
			return db.Product.updateOne({ name: product.name }, { $inc: { quantity: -product.qty }})
		})
		await Promise.all(productQtyUpdatePromises);
		// create new order
		const order = new db.Order(req.body);
		// save order in db
		await order.save();
		// store reference of order in user
		req.user.orders.push(order._id);
		// clear cart
		req.user.cart = [];
		// save user
		await req.user.save();
		res.status(201).send(order);
	} catch(e) {
		res.status(500).send({message: e.message});
	}
}

exports.getOrders = async (req, res) => {
	try {
		// populate orders using their ids
		await req.user.populate('orders').execPopulate();
		res.status(200).send({orders: req.user.orders});
	} catch(e) {
		res.status(500).send({message: ""})
	}
}