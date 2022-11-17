const express = require("express");
const router = express.Router();
router.use("/forge", require("./forge"));
module.exports = router;
