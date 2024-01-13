require("dotenv").config();
const {
  sendConfirmationEmail,
} = require("../../utils/sendConfirmationEmail.js");
const { tokenSign, refreshToken, tokenDecoder, tokenVerifier } = require("../../jwt/tokenGenerator.js");
const {
  UserAddress,
  UserCredentials,
  User,
  UserRole,
  BlackListedTokens,
} = require("../../db.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { checkTokenStatus, checkBlacklistedToken, extractJwtToken } = require("../../jwt/tokenUtils.js");

const confirmAccountController = async (token) => {
  const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!tokenDecode.userID) {
    return {
      error: true,
      response: "Credenciales incorrectas",
    };
  } else {
    const user = await User.findByPk(tokenDecode.userID);
    user.update({ isActive: true, isVerified: true });
    return {
      response: `${user.name} se encuentra correctamente autenticado`,
    };
  }
};

const registerUser = async (userObj) => {
  const newUser = await User.create({
    name: userObj.name,
    surname: userObj.surname,
    birthdate: userObj.birthdate,
    dni: userObj.dni,
    email: userObj.email,
    telephone: userObj.telephone,
    image: userObj.image,
    isActive: userObj.isActive || false,
    isVerified: userObj.isVerified || false,
  });

  // UserCredentials

  let { username, password } = userObj.userCredentials;
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
  } = userObj.userAddress;

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

  const role_name = userObj.role;

  const [userRole] = await UserRole.findOrCreate({
    where: { role_name },
    defaults: { role_name },
  });

  await newUser.setRole(userRole, { as: "role" });

  const completeUser = await User.findByPk(newUser.id, {
    include: [UserAddress, { model: UserRole, as: "role" }],
  });

  sendConfirmationEmail(
    process.env.EMAIL_MAILER,
    userObj.email,
    newUser.id,
    process.env.JWT_SECRET_KEY,
    process.env.API_URL
  );

  return completeUser;
};

const loginUser = async (user) => {
  // VERIFICAMOS QUE SEA UNA CUENTA ACTIVA
  if (user.isDeleted) {
    return {
      deleted: true,
      error: true,
      response:
        "El usuario fue eliminado, contactese con el administrador del sitio",
    };
  }
  if (!user.isActive) {
    return {
      resendMail: true,
      error: true,
      response:
        "El usuario no se encuentra activo, verifique su casilla de correo para verificar su direccion de email",
    };
  }
  const { role_name } = await UserRole.findByPk(user.rolId);
  // CON TODA ESTA DATA CREAMOS EL TOKEN DE AUTENTICACION
  const tokenSession = tokenSign(user.id, user.username, role_name);
  // RETORNAMOS AL FRONTEND EL TOKEN EL USUARIO Y EL ROL Y LA VERIFICACION DE MATCH DE PASSWORDS
  return {
    login: true,
    tokenSession,
    userId: user.id,
    user: `${user.name} ${user.surname}`,
  };
};
const refreshSession = async (token) => {
  const newToken = refreshToken(token);
  if (newToken) {
    await BlackListedTokens.findOrCreate({
      where: { token: token.split(" ").pop() },
    });
    return newToken;
  } else return { error: true, message: "TokenVencido" };
};

const logOutUser = async(token) => {
  const badToken = await BlackListedTokens.findOrCreate({
    where: { token: token.split(" ").pop() },
  });
  
  return badToken[0].token


}
const sendEmailToResetPassword = async () => {};

const resetPassword = async (userId) => {
  const user = await UserCredentials.findOne({
    where: { UserId: userId },
  });
  if (!user) {
    return {
      error: true,
      response: "Credenciales no encontradas",
    };
  }
};

const deleteActivateUserById = async (id) => {
  const user = await User.findByPk(id);
  const newState = user.isDeleted;
  user.update({ isDeleted: !newState });
  return {
    response: `${user.name} ${(newState && "Dado de alta") || "Eliminado"}`,
  };
};


const checkAuthToken = async(token) => {
  // console.log(token)
  const cleanToken = extractJwtToken(token)
  console.log(cleanToken)
  // const response = await tokenVerifier(cleanToken)
  return cleanToken  
  
}

module.exports = {
  registerUser,
  loginUser,
  refreshSession,
  logOutUser,
  confirmAccountController,
  resetPassword,
  checkAuthToken,
  deleteActivateUserById,
};
