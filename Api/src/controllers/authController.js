require("dotenv").config();
const {tokenSign} = require('../jwt/tokenGenerator.js')
const {verifyToken} = require('../jwt/tokenGenerator.js')
const { UserCredentials } = require("../db.js");
const bcrypt = require("bcrypt");

const loginUser = async (username, password) => {
  const _userCrential = await UserCredentials.findOne({
    where: { username: username },
  });

  const passwordCorrect =
    _userCrential === null
      ? false
      : await bcrypt.compare(password, _userCrential.password);
  if (!passwordCorrect) {
    return {
      error: true,
      response: "Invalid username or password",
    };
  }
  const tokenSession = await tokenSign(_userCrential.id, _userCrential.username) 

  return {
    tokenSession,
    userId: _userCrential.id,
    login: await bcrypt.compare(password, _userCrential.password),
  };
};

const checkAuthToken = async (req, res, next) => {
    try {    
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        if(!tokenData?.userId){
            res.status(409)
            res.send({error: "Not authorized"})
        }else{
            next()
        }
    } catch (error) {
        res.status(409)
        res.send({error: "Not authorized"})
    }
};

module.exports = {
  loginUser,
  checkAuthToken
};
