const { Router } = require("express");
const passport = require("passport");
const { loginUser } = require("../../../controllers/accountControllers/authController");
const useRouter = Router();

useRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

useRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3001/users",
    failureRedirect: "/",
  }),
  async (req, res) => {
    console.log("ddsadsdsadadsadsadsadsallego")
    console.log(req)
    
    

  }
);

module.exports = useRouter;
