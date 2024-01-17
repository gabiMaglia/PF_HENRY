require("dotenv").config();
const {
  sendConfirmationEmail,
  sendResetPasswordEmail,
} = require("../../utils/emailTemplates.js");
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
const {
  extractJwtToken,
  sessionFlag,
  tokenRemainingTime,
} = require("../../jwt/tokenUtils.js");

let blacklistCounter = 100;

const confirmAccountController = async (token) => {
  const tokenDecode = await verifyToken(token);

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

  const confirmationEmailToken = tokenSign({userID : newUser.id}, '2d')


  await sendConfirmationEmail(
    process.env.EMAIL_MAILER,
    newUser.email,
    confirmationEmailToken,
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
  const dataForToken = {
    userId: user.id,
    username: `${user.name} ${user.surname}`,
    userRole: role_name,
  };
  const tokenSession = tokenSign(dataForToken);
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
  const user = await User.findOne({ where: { email: email } });
  const dataForToken = {
    email: user.email,
    id: user.id,
  };
  const resetToken = tokenSign(dataForToken);
  const response = await sendResetPasswordEmail(
    process.env.EMAIL_MAILER,
    email,
    resetToken,
    process.env.FRONTEND_URL
  );
  console.log(response);
  return response;
};
const resetPassword = async (newPassword, token) => {
  const userDataFromtoken = await verifyToken(token);
  if (!userDataFromtoken) {
    return {
      error: true,
      response: "Token incorrecto",
    };
  }
  const user = await User.findByPk(userDataFromtoken.id)
  const userCredentials = await UserCredentials.findOne({
    where: { UserId: userDataFromtoken.id },
  });
  
  if (userDataFromtoken.email !== user.email) {
   
    return {
      error: true,
      response: "Token incorrecto",
    };
  }
  if (!userCredentials) {
    return {
      error: true,
      response: "Credenciales no encontradas",
    };
  } else {
    await BlackListedTokens
    await userCredentials.update({ password: await bcrypt.hash(newPassword, 8) });
    await userCredentials.save();
    return {
      error: false,
      response: "Password actualizado",
    };
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
