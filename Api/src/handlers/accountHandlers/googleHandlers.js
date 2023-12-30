require("dotenv").config();

const {
  loginUser,
} = require("../../controllers/accountControllers/authController");
const { User } = require("../../db");

const googleAuthCallback = async (req, res) => {
  try {
    const authEmail = req.user.email;
    const responseLogin = await loginUser(
      await User.findOne({ where: { email: authEmail } })
    );

    if (!responseLogin) {
      return res
        .status(401)
        .json({ response: "No existe un usuario registrado con ese email" });
    }
    
    req.session.token = responseLogin.tokenSession
   
    return res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
      <body>
      </body>
      <script>
        window.opener.postMessage(${JSON.stringify(responseLogin)}, '${
      process.env.FRONTEND_URL
    }')
      </script>
    </html>`);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  googleAuthCallback,
};
