const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology : true,
});

module.exports = {
	Product: require("./product"),
	User: require("./user"),
	Order: require("./order")
};
