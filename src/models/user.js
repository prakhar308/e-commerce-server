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
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true
			},
			qty: {
				type: Number,
				required: true
			}
		}
	],
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
});

userSchema.methods.toJSON = function(){
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
}

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({_id: user._id.toString()}, "whtandkdm");

	user.tokens.push({token});
	await user.save();

	return token;
}

userSchema.statics.loginByCredentials = async (email, password) => {
	const user = await User.findOne({email});
	if(!user){
		throw new Error("Login Failed");
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if(!isMatch){
		throw new Error("Login Failed");
	}
	return user;
} 

userSchema.pre('save', async function (next) {
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;

