const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value) {
		   if (!validator.isEmail(value)) {
		       throw new Error('Email is invalid')
		   }
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
		   if (value.toLowerCase().includes('password')) {
		       throw new Error('Password cannot contain "password"')
		   }
		}
	},
	addresses : [
		{
			street: String,
			locality: String,
			city: String,
			Pincode: String
		}
	],
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Order'
		}
	],
	cart: {
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
			}
		],
		total_bill: Number
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;

