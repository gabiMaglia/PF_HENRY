require("dotenv").config();
const {
  sendConfirmationEmail, sendResetPasswordEmail,
} = require("../../utils/sendConfirmationEmail.js");
const {
  tokenSign,
  refreshToken,
  verifyToken,
} = require("../../jwt/tokenGenerator.js");
const {
  UserAddress,
  UserCredentials,
  User,
  UserRole,
  BlackListedTokens,
} = require("../../db.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  extractJwtToken,
  sessionFlag,
  tokenRemainingTime,
} = require("../../jwt/tokenUtils.js");

let blacklistCounter = 100;

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
  const newToken = await refreshToken(token);
  if (newToken) {
    await BlackListedTokens.findOrCreate({
      where: { token: token.split(" ").pop() },
    });
    blacklistCounter = blacklistCounter - 1;
    if (blacklistCounter < 0) {
      await BlackListedTokens.truncate();
      blacklistCounter = 100;
    }
    return newToken;
  } else return { error: true, message: "TokenVencido" };
};

const logOutUser = async (token) => {
  const badToken = await BlackListedTokens.findOrCreate({
    where: { token: token.split(" ").pop() },
  });
  blacklistCounter = blacklistCounter - 1;
  if (blacklistCounter < 0) {
    await BlackListedTokens.truncate();
    blacklistCounter = 100;
  }
  return badToken[0].token;
};
// PASSWORD RESET
const sendEmailToResetPassword = async (email) => {
  const user = await User.findOne({where: {email: email}})
 const response = await sendResetPasswordEmail(
    process.env.EMAIL_MAILER,
    email,
    user.id,
    process.env.JWT_SECRET_KEY,
    process.env.FRONTEND_URL
  );
  return response
};
const resetPassword = async (newPassword, token) => {
  const isValid = await verifyToken(token);
  console.log(isValid)
  if(!isValid) {
    return {
      error: true,
      response: "Token incorrectas",
    };
  }
  const user = await UserCredentials.findOne({
    where: { UserId: isValid.userId },
  });
  
  if (!user) {
    return {
      error: true,
      response: "Credenciales no encontradas",
    };
  }else {
    await user.update({password: await bcrypt.hash(newPassword, 8)})
    await user.save()
    return {
      error: false,
      response: 'Password actualizado'
    }
  }

};
// 
const deleteActivateUserById = async (id) => {
  const user = await User.findByPk(id);
  const newState = user.isDeleted;
  user.update({ isDeleted: !newState });
  return {
    response: `${user.name} ${(newState && "Dado de alta") || "Eliminado"}`,
  };
};

const checkAuthToken = async (token) => {
  const cleanToken = extractJwtToken(token);
  const response = await verifyToken(cleanToken);
  if (response.error) return { error: true, name: response.name };
  else {
    const dataFromToken = await sessionFlag(response);
    const timeLeft = tokenRemainingTime(response);
    return {
      error: false,
      userId: response.userId,
      usuario: dataFromToken.Usuario,
      role: response.userRole,
      timeLeft: timeLeft.message,
      timeLeftInSeconds: timeLeft.time,
    };
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshSession,
  logOutUser,
  confirmAccountController,
  resetPassword,
  sendEmailToResetPassword,
  checkAuthToken,
  deleteActivateUserById,
};
