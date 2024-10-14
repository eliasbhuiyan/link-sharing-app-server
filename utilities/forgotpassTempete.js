module.exports = function forgotpassTempete(token) {
    return `Click to verify account <a href="http://localhost:5173/resetpassword?token=${token}">Click</a>`;
};