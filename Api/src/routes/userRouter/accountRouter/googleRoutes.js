const { Router } = require("express");
const passport = require("passport");
const { loginUser } = require("../../../controllers/accountControllers/authController");
const {UserCredentials, User} = require("../../../db");
const useRouter = Router();

useRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

useRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    // successReturnToOrRedirect: '/',
    // failureRedirect: "/",
    passReqToCallback: true
  }),
  async (req, res) => {
    const googleId = req.user._json.sub
    const authEmail = req.user._json.email
    const responseLogin = await loginUser(authEmail, googleId)

    res.status(200).json(responseLogin)


  }
);

module.exports = useRouter;
