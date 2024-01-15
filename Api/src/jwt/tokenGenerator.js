require("dotenv").config();
const SECRET = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");
const { checkBlacklistedToken } = require("./tokenUtils");

const tokenSign = (userId, username, userRole, tokenTime = '1m') => {
  const userForToken = {
    userId: userId,
    username,
    userRole,
  };
  const token = jwt.sign(userForToken, SECRET, { expiresIn: tokenTime });
  return token;
};

const verifyToken = async (token) => {
  try {
    const isBlackListed = await checkBlacklistedToken(token);
    if (isBlackListed) return { error: true, name: "blackListedToken" };
    const decodedToken = jwt.verify(token, SECRET);
    return decodedToken;
  } catch (error) {
    console.log(error.name);
    return { error: true, name: error.name };
  }
};

const refreshToken = async (token) => {
  try {
    const decodedToken = await verifyToken(token.split(" ").pop());
    if (decodedToken.error) return { error: true, message: decodedToken.name };
    
    const tokenRefreshTime = '2h'
    const newToken = tokenSign(
      decodedToken.userId,
      decodedToken.username,
      decodedToken.userRole,
      tokenRefreshTime
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
