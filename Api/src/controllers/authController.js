require("dotenv").config();
const {tokenSign} = require('../jwt/tokenGenerator.js')
const {UserAddress, UserCredentials, User, UserRole } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { sendConfirmationEmail } = require("../utils/sendConfirmationEmail.js");

const confirmAccountController = async (token ) => {
  const tokenDecode = jwt.verify(token, process.env.SECRET)
  if (!tokenDecode.userID) {
   return {
      error: true,
      response: "Invalid username or password",
    }
  }
  else {
   const user = await User.findByPk(tokenDecode.userID)
   user.update({isActive: true})
   console.log(user.name)
   return {
    response: user.name
   }
  }
}

const registerUser = async ( name,
  surname,
  birthdate,
  dni,
  email,
  telephone,
  image,
  userCredentials,
  userAddress,
  roles
) => {
  // UserOBJ
  const newUser = await User.create({
    name,
    surname,
    birthdate,
    dni,
    email,
    telephone,
    image,
  });

  // UserCredentials

  let { username, password } = userCredentials;
  const newUserCredentials = await newUser.createUserCredential({
    username,
    password: await bcrypt.hash(password, 8),
  });
  newUserCredentials.id = newUser.id;
  await newUserCredentials.save();

  // UserAddress
  const {
    country = "",
    state = "",
    city = "",
    street = "",
    number = "",
    zipCode = "",
  } = userAddress;

  const newUserAddress = await newUser.createUserAddress({
    country,
    state,
    city,
    street,
    number,
    zipCode,
  });
  newUserAddress.id = newUser.id;
  await newUserAddress.save();

  // UserRoles

  const role_name = roles;
  const [userRole] = await UserRole.findOrCreate({
    where: { role_name },
    defaults: { role_name },
  });

  await newUser.setRole(userRole, { as: "role" });



  const completeUser = await User.findByPk(newUser.id, {
    include: [UserAddress, { model: UserRole, as: "role" }],
  });

  sendConfirmationEmail('gab.maglia@gmail.com', 'gab.maglia@gmail.com', newUser.id, process.env.SECRET, 'localhost:3001'  )
  return completeUser;
};

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
  registerUser,
  loginUser,
 confirmAccountController

};
