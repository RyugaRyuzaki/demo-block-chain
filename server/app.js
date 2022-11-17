require("dotenv").config();
const debug = require("debug")("BlockChain:server");
const http = require("http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const corsOptions = require("./Config/allowCors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ extended: false, limit: "50mb" }));
app.use(cookieParser());
// app.use(cors(corsOptions));
app.use(express.json());
app.use(require("./routes"));
app.set("port", process.env.PORT);
var server = http.createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
});
server.listen(process.env.PORT, () => {
	console.log("Server is listen on port :", process.env.PORT);
});
function onListening() {
	var addr = server.address();
	var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	debug("Listening on " + bind);
}
