const User = require("../../modal/userScema");
const emailValidation = require("../../utilities/emailValidation");
const { emailVerification } = require("../../utilities/sendEmail");
const verifyTemplete = require("../../utilities/verifyTemplete");
const passwordValidation = require("../../utilities/passwordValidation");
const bcrypt = require("bcrypt");
const token = require("../../utilities/token");
const registration = async (req, res) => {
  const {
    fullName,
    email,
    password,
  } = req.body;
  if (!email) {
    return res.status(400).send({ error: "Email is required!" });
  } else if (!emailValidation(email)) {
    return res.status(400).send({ error: "Email is invalid!" });
  } else if (!password) {
    return res.status(400).send({ error: "Password is required!" });
  }
  // else if(!passwordValidation(password)){
  //     return res.send({error: 'Input a strong password'})
  //   }
  else {
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return res.status(400).send({
        error: "Email already in used, please try with another email",
      });
    }
  }

  bcrypt.hash(password, 10, function (err, hash) {
    const user = new User({
      fullName,
      email,
      password: hash,
      otp: token(),
    });
    user.save();
    emailVerification(user.email, user.otp, verifyTemplete);
    res.status(200).send({
      success: "Registration Successful!, Check your email for verification",
      userId: user._id,
    });
    setTimeout(async () => {
      await User.findOneAndUpdate(
        { email },
        { $set: { otp: null } },
        { new: true }
      );
    }, 600000);
  });
};

// const resendOtp = async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const user = await User.findOne({ _id: userId });
//     if (user) {
//       if (user.emailVerified) {
//         return res.status(201).send({ info: "Email already verified! Please login." });
//       }
//       await User.findOneAndUpdate({ _id: userId }, { $set: { otp: token() } }, { new: true });
//       emailVerification(user.email, user.otp, verifyTemplete);
//       res.status(200).send({ message: "Otp Resend! Check your email" });
//       setTimeout(async () => {
//         await User.findOneAndUpdate(
//           { email: user.email },
//           { $set: { otp: null } },
//           { new: true }
//         );
//       }, 800000);
//     } else {
//       res.status(400).send({ error: "User not found!" });
//     }
//   } catch (error) {
//     res.status(400).send({ error: "Something went wrong!" });
//   }
// }
module.exports = { registration };
