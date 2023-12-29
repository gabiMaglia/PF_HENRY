require("dotenv").config();
const SECRET = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

const tokenSign = async (userId, username, userRole) => {
  const userForToken = {
    userId: userId,
    username,
    userRole,
  };
  console.log(SECRET)
  const token = jwt.sign(userForToken, SECRET, { expiresIn: "1h" });
  return token;
};
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  tokenSign,
  verifyToken,
};
