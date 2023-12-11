const {
  loginUser,
} = require("../../controllers/accountControllers/authController");
const googleAuthCallback = async (req, res) => {
  const googleId = req.user._json.sub;
  const authEmail = req.user._json.email;
  const responseLogin = await loginUser(authEmail, googleId);
  res.status(200).json(responseLogin);
};

module.exports = {
  googleAuthCallback,
};
