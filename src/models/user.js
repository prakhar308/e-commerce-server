const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
	googleId: String,
	addresses : [
		{
			street: String,
			locality: String,
			city: String,
			pincode: String
		}
	],
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Order'
		}
	],
	cart: [
		{
			_id: false,
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true
			},
			qty: {
				type: Number,
				required: true
			}
		}
	]
});

userSchema.methods.toJSON = function(){
	const user = this;
	const userObject = user.toObject();

	delete userObject.googleId;

	return userObject;
}

const User = mongoose.model('User', userSchema);

module.exports = User;

