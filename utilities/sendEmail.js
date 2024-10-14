const nodemailer = require("nodemailer");
// ================ ===================== ================
// ================ Email Verification Start ================
// ================ ===================== ================
async function emailVerification(email, token, templete) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `no reply" ${process.env.MAIL_USERNAME}`,
    to: email,
    subject: "Account verification",
    html: templete(token),
  });
};
// ================ =========================== ================
// ================ Email Forgot Password Start ================
// ================ =========================== ================
async function emailForgotPassword(email, token, templete) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `no reply" ${process.env.MAIL_USERNAME}`,
    to: email,
    subject: "Reset Password",
    html: templete(token),
  });
};

module.exports = { emailVerification, emailForgotPassword }