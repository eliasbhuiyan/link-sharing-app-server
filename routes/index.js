const express = require("express");
const router = express.Router();
const api = process.env.API;
const apiRoutes = require("./api");

router.use(api, apiRoutes);
router.get("/", (req, res) => {
  res.send(`Hey what's up!`);
});

router.use(api, (req, res) => {
  res.send("Not Found!");
});

module.exports = router;
