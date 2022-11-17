const allowedOrigins = [process.env.BASE_URL];
const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.includes(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by Cors"));
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
};
module.exports = corsOptions;
