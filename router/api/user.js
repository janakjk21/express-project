const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

//@route  Get api/user
//decc  Test route
//acess Public

router.post(
	"/",
	[
		check("name", "no name found").not().isEmpty(),
		check("email", "plz enter valid email").isEmail(),
		check("password", "plz enter valid password").isLength({ min: 6 }),
	],
	async (req, res) => {
		const error = validationResult(req);

		if (!error.isEmpty()) {
			return res.status(400).json({ error: error.array() });
		}
		console.log(req.body);

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ error: [{ msg: "user already exists " }] });
			}

			//gravatar

			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});

			user = new User({
				name,
				email,
				avatar,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 36000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("server error");
		}
	}
);
module.exports = router;
