const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../modal/userScema");
const { emailForgotPassword } = require("../../utilities/sendEmail");
const forgotpassTempete = require("../../utilities/forgotpassTempete");

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({ error: "Email is required!" });
    }
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
        let token = jwt.sign({ email: email }, process.env.SWTSECRT);
        await User.findOneAndUpdate(
            { email },
            { $set: { forgotpassToken: token } },
            { new: true }
        );
        emailForgotPassword(email, token, forgotpassTempete);
        setTimeout(async () => {
            await User.findOneAndUpdate(
                { email },
                { $set: { forgotpassToken: null } },
                { new: true }
            );
        }, 600000);
        return res
            .status(200)
            .send({ message: "Request sent successfully! Please check your email" });
    } else {
        return res.status(400).send({ error: "User not found!" });
    }
};

const resetPassword = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).send({ error: "Email is required!" });
    }
    if (!password) {
        return res.status(400).send({ error: "Password is required!" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: "User not found!" });
        }
        const validOtp = user.forgotpassToken;
        const providedOtp = req.headers.authorization;
        if (validOtp !== providedOtp) {
            return res.status(400).send({ error: "Authorization Failed!" });
        } else {
            bcrypt.hash(password, 10, async function (err, hash) {
                await User.findByIdAndUpdate(user._id, {
                    $set: { password: hash, forgotpassToken: null },
                });
                return res
                    .status(200)
                    .send({ message: "Password reset successfully!" });
            });
        }
    } catch (err) {
        return res.status(400).send({ error: "Authorization Failed!" });
    }
};

module.exports = { forgotPassword, resetPassword };
