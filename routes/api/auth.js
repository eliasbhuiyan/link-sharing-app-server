const express = require("express");
const { registration } = require("../../controllers/authControllers/registrationControllers");
const loginControllers = require("../../controllers/authControllers/loginControllers");
const otpMatch = require("../../controllers/authControllers/otpMatchControllers");
const { forgotPassword, resetPassword } = require("../../controllers/authControllers/forgotPassword");
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage });
const userControl = require("../../middleware/userAuthorization");
const updateUser = require("../../controllers/authControllers/updateUser");
const { getSingleUser } = require("../../controllers/authControllers/getSingleUser");
const router = express.Router();

router.post("/registration", registration);
router.post("/login", loginControllers);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);
// router.post("/resendotp", resendOtp);
router.post("/otpmatch", otpMatch);
router.post("/update/:userId", userControl, upload.single("image"), updateUser)
router.get("/getSingleUser/:userId", getSingleUser)

module.exports = router;
