const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


function hashPassword(newPass) {
    return bcrypt.hashSync(newPass, 12)
}

function checkPass(pass, hashedPass) {
    return bcrypt.compareSync(pass, hashedPass)
}

function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_KEY);
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_KEY);
}

module.exports = { checkPass, hashPassword, createToken, verifyToken }