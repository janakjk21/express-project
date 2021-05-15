const express = require("express");
const app = express();
const connectDB = require("./config/db");
var bodyParser = require("body-parser");

connectDB();
// //init middle where

app.use(bodyParser.json({ extended: false }));

const PORT = process.env.PORT || 3000;
//define Routers

app.use("/api/profile", require("./router/api/profile"));
app.use("/api/auth", require("./router/api/auth"));
app.use("/api/post", require("./router/api/post"));
app.use("/api/user", require("./router/api/user"));

app.get("/", (req, res) => {
	res.send("Api is running now bro ...");
});

app.listen(PORT, () => {
	console.log(`we are running at ${PORT}`);
});
