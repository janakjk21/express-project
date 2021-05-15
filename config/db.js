const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
	try {
		await mongoose.connect(db);
		useUnifiedTopology: true;
		useNewUrlParser: true;
		useUnifiedTopology: true;
		console.log("we are now connected ");
	} catch (err) {
		console.log(err.message);

		process.exit(1);
	}
};

module.exports = connectDB;
