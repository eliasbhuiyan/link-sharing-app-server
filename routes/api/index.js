const express = require("express");
const router = express.Router();
const authentication = require("./auth");
const linkRoutes = require("./link")

router.use("/auth", authentication);
router.use("/link", linkRoutes);

module.exports = router;
