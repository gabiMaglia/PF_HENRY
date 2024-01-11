require("dotenv").config();
const SECRET = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

const tokenSign = (userId, username, userRole) => {
  const userForToken = {
    userId: userId,
    username,
    userRole,
  };
  const token = jwt.sign(userForToken, SECRET, { expiresIn: "1d" });
  return token;
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};

const refreshToken = (token) => {
  try {
    const decodedToken = verifyToken(token.split(' ').pop());
    
    const newToken = tokenSign(
      decodedToken.userId,
      decodedToken.username,
      decodedToken.userRole
    );
    return newToken;
  } catch (error) {
    return error;
  }
};

module.exports = {
  tokenSign,
  verifyToken,
  refreshToken,
};
