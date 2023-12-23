const { Router } = require("express");
const passport = require("passport");
const {
  googleAuthCallback,
} = require("../../../handlers/accountHandlers/googleHandlers");
const useRouter = Router();
useRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
useRouter.get(
  "/google/callback",
  passport.authenticate("google", {
  }),
  googleAuthCallback
);

module.exports = useRouter;