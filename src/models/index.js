const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology : true,
});

module.exports.Product = require("./product");
module.exports.User = require("./user");
