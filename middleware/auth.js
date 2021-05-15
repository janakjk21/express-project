const jwt = require("jsonwebtoken");
const config = require("config");
const { header } = require("express-validator");
const jwtSecret = config.get("jwtSecret");

module.exports = (req, res, next) => {
	const token = req.header("x-auth-token");

	if (!token) {
		return res.status(401).json({ msg: "no token no auth baby" });
	}
	//verify token

	try {
		const decode = jwt.verify(token, jwtSecret);
		console.log(`this is decode data ${decode}`);
		req.user = decode.user;
		console.log(`this is decode data ${req.user}`);

		next();
	} catch (err) {
		res.status(401).json({ msg: "Token is in valid" });
	}
};
