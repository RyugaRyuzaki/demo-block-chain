const AccountModel = require("../models/AccountModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getToken = require("../config/getToken");
module.exports = {
	signUp: async (req, res, next) => {
		try {
			if (!req.body.username || !req.body.password || !req.body.email) {
				return res.status(402).json({ message: "input payment", result: false });
			}
			const salt = await bcrypt.genSalt(8);
			const hashed = await bcrypt.hash(req.body.password, salt);
			const user = await new AccountModel({
				username: req.body.username,
				email: req.body.email,
				password: hashed,
			});
			const newUser = await user.save();
			res.status(200).json({ message: "Success", result: true });
		} catch (error) {
			res.status(500).json({ message: error.message, result: false });
		}
	},
	login: async (req, res, next) => {
		try {
			if (!req.body.username || !req.body.password) {
				return res.status(402).json({ message: "input payment", result: false });
			}
			const user = await AccountModel.findOne({ username: req.body.username });
			if (!user) {
				return res.status(404).json({ message: "Wrong username", result: false });
			}
			const encoded = await bcrypt.compare(req.body.password, user.password);
			if (!encoded) {
				return res.status(404).json({ message: "Wrong password", result: false });
			}
			const { password, ...others } = await user._doc;
			const accessToken = await getToken.getAccessToken(user);
			const refreshToken = await getToken.getRefreshToken(user);
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: false,
				path: "/",
				sameSite: "strict",
			});
			res.status(200).json({ message: "Success", ...others, accessToken: accessToken });
		} catch (error) {
			res.status(500).json({ message: error.message, result: false });
		}
	},
};
