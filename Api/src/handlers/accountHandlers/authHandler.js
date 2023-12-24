const {
  loginUser,
  registerUser,
  confirmAccountController,
} = require("../../controllers/accountControllers/authController");


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
  const { username, password } = req.body;
  try {
    const response = await loginUser(username, password);
    if (response.error) {
      return res.status(401).json(response.response);
    }
    res.cookie("jwt", response.tokenSession, {
      expire: new Date() + 1,
      httpOnly: false,
      sameSite: "Strict",
      secure: true,
    });
    
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const forgetPassword = async (req, res) => {
  try {
    const {username} = req.body
    const message = `Chekea tu casilla de correo para resetear el password`

    if (!username) return res.status(400).json({message: `User ${username} not found`})
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
const confirmAccountHandler = async (req, res) => {
  const { token } = req.params;
  try {
    const response = await confirmAccountController(token);
    return res.status(200).send(response.response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  loginHandler,
  signInHandler,
  forgetPassword,
  confirmAccountHandler,
};
