const { User, UserCredentials } = require("../db.js");
const bcrypt = require("bcrypt");

const loginUser = async (username, password) => {

    const _userCrential = await UserCredentials.findOne({ where : {username : username} })
    console.log(_userCrential)
    const passwordCorrect = _userCrential === null 
    ? false 
    : await bcrypt.compare(password, _userCrential.password)
    if (!passwordCorrect) {
        return {
            error : true,
            response:'Invalid username or password'
        }
    }
   
    return { userId : _userCrential.id, login: await bcrypt.compare(password, _userCrential.password) };
};

module.exports = {
  loginUser,
};
