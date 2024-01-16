const {
  loginUser,
  registerUser,
  confirmAccountController,
  refreshSession,
  logOutUser,
  checkAuthToken,
  deleteActivateUserById,
  sendEmailToResetPassword,
  resetPassword,
} = require("../../controllers/accountControllers/authController");
const {
  getUserById,
} = require("../../controllers/userControllers/userController");

const signInHandler = async (req, res) => {
  const {
    name,
    surname,
    birthdate,
    dni,
    email,
    telephone,
    image,
    userCredentials,
    userAddress,
    role = "custommer",
  } = req.body.userObj;
  try {
    if (
      !name ||
      !surname ||
      !birthdate ||
      !dni ||
      !email ||
      !telephone ||
      !userCredentials
    ) {
      return res.status(400).json({ error: "Missing required data..." });
    }
    const response = await registerUser({
      name,
      surname,
      birthdate,
      dni,
      email,
      telephone,
      image,
      userCredentials,
      userAddress,
      role,
    });

    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const loginHandler = async (req, res) => {
  try {
    const response = await loginUser(req.user);
    if (response.error) {
      return res.status(401).json(response.response);
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
// PASSWORD RESET
const forgetPasswordHandler = async (req, res) => {
  try {
    console.log(req.params.email)
    if (req.params.email) {
      const { email } = req.params;
      const message = `Chekea tu casilla de correo para resetear el password`;
      const response = await sendEmailToResetPassword(email);
      return res.status(200).send(`${response}, ${message}`);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const changePasswordHandler = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, password2 } = req.body;
    console.log(password, password2)
    if (password !== password2){ 
      return res.status(400).json({error : true, message: "Ambos passwords deben coinidir"});
    }
    const response = await resetPassword( password, token);
    if (response.error) {
      return res.status(401).json({error: true, message: response.response})
    }else {
      return res.status(200).send(response.response);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
// 
const confirmAccountHandler = async (req, res) => {
  const { token } = req.params;
  try {
    const response = await confirmAccountController(token);
    return res.status(200).send(response.response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const refreshSessionHandler = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const response = await refreshSession(token);
    return res.status(200).json({ jwt: response });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const logoutHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    await logOutUser(token);
    return res.status(200).send(`Ha cerrado sesion correctamente`);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const jwtCheckHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const tokenResponse = await checkAuthToken(token);
    return res.status(200).json(tokenResponse);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const deleteActivateUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteActivateUserById(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = {
  loginHandler,
  logoutHandler,
  signInHandler,
  forgetPasswordHandler,
  changePasswordHandler,
  confirmAccountHandler,
  refreshSessionHandler,
  deleteActivateUserByIdHandler,
  jwtCheckHandler,
};
