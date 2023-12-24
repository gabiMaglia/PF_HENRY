require("dotenv").config();

const {
  loginUser,
} = require("../../controllers/accountControllers/authController");

const googleAuthCallback = async (req, res) => {
  try {
    
    const googleId = req.user._json.sub;
    const authEmail = req.user._json.email;

    const responseLogin = await loginUser(authEmail, null, googleId);
    if (responseLogin.error) {
    
      return res.status(401).json(responseLogin.response);
   
    }
    res.cookie('jwt',responseLogin.tokenSession, {
      expire : new Date() + 1,
      httpOnly: false,
      sameSite:'Strict',
      secure: true
    });
 
    return res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
      <body>
      </body>
      <script>
        window.opener.postMessage(${JSON.stringify(responseLogin)}, '${process.env.FRONTEND_URL}')
      </script>
    </html>`);

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  googleAuthCallback,
};
