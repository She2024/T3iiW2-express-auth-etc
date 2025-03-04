
const jwt = require("jsonwebtoken");

async function validateToken (request, response, next) {
    
    const token = request.headers.jwt;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.authUserData = decoded;
    next();
}

module.exports = {
    validateToken
};