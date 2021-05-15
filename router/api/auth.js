const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//@route  Get api/auth
//decc  Test route
//acess Public

router.get("/", auth, (req, res) => {
	res.send("this is profile auth");
});
module.exports = router;
