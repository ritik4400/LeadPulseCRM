const jwt = require('jsonwebtoken');

// Generate Access Token (short expiry, e.g., 15m)
const generateAccessToken = (user) =>{
    return jwt.sign(
        {id:user._id , role:user.role},// payload
        process.env.JWT_SECRET,// secret key
        {expiresIn:'15m'} // token expiration
    );
};

// Generate Refresh Token (long expiry, e.g., 7 days)

const generateRefreshToken = (user) =>{
    return jwt.sign(
        {id:user._id },// minimal payload
        process.env.JWT_SECRET,// secret key
        {expiresIn:'7d'} // longer expiration
    );
};
const verifyToken = (token) =>{
    return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
}

