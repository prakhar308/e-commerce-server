const mongoose = require("mongoose");
const validator = require('validator');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	price: {
		type: Number,
		required: true,
		validate(val) {
			if(val <= 0) {
				throw new Error('Price cannot be negative');
			}
		}
	},
	img: String,
	category: {
		type: String,
		required: true,
		trim: true
	},
	description: String,
	quantitiy: {
		type: String,
		required: true,
		validate(val) {
			if(val <= 0) {
				throw new Error('Price cannot be negative');
			}
		}
	}
}) 

const Product = mongoose.model('Product', productSchema);

module.exports = Product;