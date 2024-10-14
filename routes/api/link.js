const express = require("express");
const { addLink } = require("../../controllers/linksControllers/link");
const userAuthorization = require("../../middleware/userAuthorization");
const router = express.Router();

router.post("/addlink", userAuthorization, addLink);


module.exports = router;
