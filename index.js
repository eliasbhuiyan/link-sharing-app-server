const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
require("dotenv").config();
const dbconfig = require("./config/dbconfig");
const path = require("path");
routes = require("./routes");
const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(cors(
  {
    origin: [
      "https://link-sharing-app-eb.vercel.app",
    ],
    credentials: true
  }
));

dbconfig();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(routes);

app.listen(8000, () => {
  console.log("Server is running");
});
