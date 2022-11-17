const db = require("mongoose");

db.connect(process.env.URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected Database success");
	})
	.catch("eror");

module.exports = db;
