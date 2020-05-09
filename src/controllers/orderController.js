const db = require("../models/");

exports.createOrder = async (req, res) => {
	try {
		// create new order
		const order = new db.Order(req.body);
		// save order in db
		await order.save();
		// store reference of order in user
		req.user.orders.push(order._id);
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