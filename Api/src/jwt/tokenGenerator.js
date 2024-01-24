require("dotenv").config();
const SECRET = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");
const { checkBlacklistedToken } = require("./tokenUtils");

const tokenSign = (dataForToken, tokenTime = '1h') => {
  const token = jwt.sign(dataForToken, SECRET, { expiresIn: tokenTime });
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
    
    const tokenRefreshTime = '3h'
    const dataForToken = {
     userId  : decodedToken.userId,
     username: decodedToken.username,
     userRole: decodedToken.userRole,
    }
    const newToken = tokenSign(
      dataForToken,
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
