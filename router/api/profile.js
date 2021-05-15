const express = require("express");
const router = express.Router();

//@route  Get api/profile
//decc  Test route
//acess Public

router.get("/", (req, res) => {
	res.send("this is profile route");
});

module.exports = router;
