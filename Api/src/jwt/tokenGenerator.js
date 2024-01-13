require("dotenv").config();
const SECRET = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");
const { checkBlacklistedToken } = require("./tokenUtils");


const tokenSign = (userId, username, userRole) => {
  const userForToken = {
    userId: userId,
    username,
    userRole,
  };
  const token = jwt.sign(userForToken, SECRET, { expiresIn: "1h" });
  return token;
};

const verifyToken = async (token) => {
  try {
    const isBlackListed = await checkBlacklistedToken(token)
    if (isBlackListed) return {error: true, name: 'blackListedToken'}
    const decodedToken = jwt.verify(token, SECRET);
    return decodedToken;
  } catch (error) {
    console.log(error.name)
    return {error: true, name: error.name};
  }
};

const refreshToken = async (token) => {
  try {
    const decodedToken = await verifyToken(token.split(" ").pop());
    if (decodedToken.error) return {error: true, message: decodedToken.name}
    console.log(decodedToken)
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
