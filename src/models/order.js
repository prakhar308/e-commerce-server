const mongoose = require("mongoose");
const validator = require('validator');

const orderSchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
		default: new Date()  
	},
	products: [
		{
			_id: false,
			img: String,
			name: String,
			qty: Number,
			price: Number,
		}
	],
	total_bill: {
		type: Number,
		required: true,
		validate(val) {
			if(val <= 0) {
				throw new Error('Total bill cannot be negative');
			}
		}	
	},
	address: {
		name: String,
		street: String,
		locality: String,
		city: String,
		pincode: String
	}
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;