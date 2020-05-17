const db = require("../models");

exports.createUser = async (req, res) => {
	res.redirect("/api/auth/google");
}

exports.loginUser = async (req, res) => {
	res.redirect("/api/auth/google");
}

exports.logoutUser = async (req, res) => {
	req.logout();
	res.status(200).send({mesage: "Sucessfully logged out"});
}

exports.readUser = async (req, res) => {
	res.send(req.user);
}

exports.updateUser = async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' })
	}

	try {
		updates.forEach((update) => req.user[update] = req.body[update])
		await req.user.save();

		res.send(req.user)
	} catch (e) {
		res.status(400).send(e)
	}
}

exports.deleteUser = async (req, res) => {
	try {
		await req.user.remove();
		res.send(req.user)
	} catch (e) {
		res.status(500).send()
	}
}