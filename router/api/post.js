const express = require("express");
const router = express.Router();

//@route  Get api/post
//decc  Test route
//acess Public

router.get("/", (req, res) => {
	res.send("this is post");
	console.log(req.body);
});
module.exports = router;
