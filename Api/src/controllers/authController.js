require("dotenv").config();
const {tokenSign} = require('../jwt/tokenGenerator.js')
const { UserCredentials, User, UserRole } = require("../db.js");
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
  // SI USERNAME Y PASSWORD MACHEAN EN LA DB< EXTRAEMOS EL ROL DEL USUARIO QUE LOGUEA
  const _user = await User.findByPk(_userCrential.UserId) 
  const {role_name} = await UserRole.findByPk(_user.rolId)
  // CON TODA ESTA DATA CREAMOS EL TOKEN DE AUTENTICACION
  const tokenSession = await tokenSign(_user.rolId, _userCrential.username, role_name) 
  // RETORNAMOS AL FRONTEND EL TOKEN EL USUARIO Y EL ROL Y LA VERIFICACION DE MATCH DE PASSWORDS
  return {
    login:true,
    tokenSession,
    userId: _user.rolId,
    role_name,
  };
};


module.exports = {
  loginUser,

};
