const { Router } = require("express");
const passport = require("passport");
const {
  googleAuthCallback,
} = require("../../../handlers/accountHandlers/googleHandlers");
const useRouter = Router();
useRouter.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);
useRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);
module.exports = useRouter;
