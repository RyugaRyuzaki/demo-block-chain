const db = require("./DataModel");
const Schema = db.Schema;
const Account = new Schema(
	{
		username: {
			type: String,
			require: true,
			minLength: 6,
			maxLength: 30,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			minLength: 6,
			maxLength: 30,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		tempPassword: {
			type: String,
		},
	},

	{
		timestamps: true,
	}
);

const AccountModel = db.model("Account", Account);
module.exports = AccountModel;
