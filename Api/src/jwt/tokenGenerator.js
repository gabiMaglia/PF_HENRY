require("dotenv").config();
const SECRET = process.env.SECRET;

const jwt = require("jsonwebtoken");

const tokenSign = async (userId, username) => {
  const userForToken = {
    userId: userId, 
    username,
  };
  const token = jwt.sign(userForToken, SECRET, {expiresIn: '1h'});
  return token;
};
const verifyToken = async (token) => {
    try {
       
        return jwt.verify(token, process.env.SECRET)        
    } catch (error) {
        return null
    }
};
const decodeTOken = async (user) => {};

module.exports = {
  tokenSign,
  verifyToken,
  decodeTOken,
};
