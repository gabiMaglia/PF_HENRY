const { Router } = require("express");
const passport = require("passport");
const {
  loginHandler,
  logoutHandler,
  signInHandler,
  confirmAccountHandler,
  refreshSessionHandler,
  deleteActivateUserByIdHandler,
} = require("../../../handlers/accountHandlers/authHandler");
const {
  checkRoleAuthToken,
} = require("../../../middlewares/tokenAuthMiddlewares");
const useRouter = Router();

useRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginHandler
);
useRouter.post("/signin", signInHandler);
useRouter.delete("/:id", checkRoleAuthToken(['admin']),  deleteActivateUserByIdHandler);
useRouter.get("/confirm/:token", confirmAccountHandler);
useRouter.get("/refresh", refreshSessionHandler);
useRouter.get("/logout", logoutHandler);

module.exports = useRouter;
