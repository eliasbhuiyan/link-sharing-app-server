const mongoose = require("mongoose");
const User = require("../modal/userScema");
const jwt = require("jsonwebtoken");
// ======= ============================ ================
// ======= Secured Admin Merchant Start ================
// ======= ============================ ================
async function userAuthorization(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(400).send({ error: "Authorization Failed!" });
    }
    const sec_token = req.headers.authorization
    const decoded = jwt.verify(sec_token, process.env.JWT_SEC)
    try {
        let user = await User.find({ _id: decoded._id });
        if (user.length > 0) {
            next()
        } else {
            return res.status(400).send({ error: "Authorization Failed!" });
        }
    } catch {
        return res.status(400).send({ error: "Authorization Failed!" });
    }
}

module.exports = userAuthorization