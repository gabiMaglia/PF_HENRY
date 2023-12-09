require("dotenv").config();
const SECRET = process.env.SECRET;

const jwt = require("jsonwebtoken");

const tokenSign = async (userId, username, userRole) => {
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
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return null;
  }
};


module.exports = {
  tokenSign,
  verifyToken,
};
