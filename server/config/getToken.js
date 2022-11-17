const jwt = require("jsonwebtoken");
module.exports = {
	getAccessToken: async (user) => {
		return await jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN, {
			expiresIn: process.env.EXP_ACCESS_TOKEN,
		});
	},
	getRefreshToken: async (user) => {
		return await jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN, {
			expiresIn: process.env.EXP_REFRESH_TOKEN,
		});
	},
};
