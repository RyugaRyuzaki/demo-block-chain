const express = require("express");

const router = express.Router();

router.use("/v1/api", require("./v1"));
router.use("/v2/api", require("./v2"));
module.exports = router;
