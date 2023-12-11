const {
  loginUser,
} = require("../../controllers/accountControllers/authController");

const googleAuthCallback = async (req, res) => {
  try {
    const googleId = req.user._json.sub;
    const authEmail = req.user._json.email;
    const responseLogin = await loginUser(authEmail, googleId);
    if (responseLogin.error) {
      return res.status(401).json(response.response);
    }
    return res.status(200).json(responseLogin);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  googleAuthCallback,
};
