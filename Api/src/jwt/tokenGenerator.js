require("dotenv").config();
const SECRET = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

const tokenSign = (userId, username, userRole) => {
  const userForToken = {
    userId: userId,
    username,
    userRole,
  };
  const token = jwt.sign(userForToken, SECRET, { expiresIn: "1m" });
  return token;
};

const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, SECRET);
    return decodedToken;
  } catch (error) {
    console.log(error.name)
    return error.name;
  }
};

const refreshToken = (token) => {
  try {
    const decodedToken = verifyToken(token.split(" ").pop());

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
