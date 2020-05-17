const db = require('../models');

const auth = (req, res, next) => {
	if(!req.user){
		res.status(401).send({message: "Please Authenticate"})
	} else {
		next();
	} 
}

module.exports = auth;