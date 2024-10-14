const { default: mongoose } = require("mongoose");
const User = require("../../modal/userScema");
const otpMatch = async (req, res) => {
  const { userId, otp } = req.body;


  if (!otp) {
    return res.status(400).send({ error: "OTP is required!" });
  } else {
    try {
      const existingUser = await User.find({ _id: userId });
      if (existingUser.length > 0) {
        if (existingUser[0].otp === otp) {
          await User.findOneAndUpdate(
            { _id: userId },
            { $set: { otp: null, emailVerified: true } },
            { new: true }
          );
          return res.status(200).send({ message: "OTP verified!" });
        } else {
          return res.status(400).send({ error: "Invalid OTP!" });
        }
      } else {
        return res.status(400).send({ error: "User not found!" });
      }
    } catch (error) {
      return res.status(400).send({ error: "Invalid Attempt !" });
    }
  }
};

module.exports = otpMatch;
