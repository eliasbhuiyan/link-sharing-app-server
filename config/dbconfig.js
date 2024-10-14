const mongoose = require("mongoose");

module.exports = function dbconfig() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Db Connected!"));
};
