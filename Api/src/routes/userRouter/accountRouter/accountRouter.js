const { Router } = require("express");
const passport = require("passport");
const {
    loginHandler,
    logoutHandler,
    signInHandler,
    confirmAccountHandler,
    deleteActivateUserByIdHandler
} = require("../../../handlers/accountHandlers/authHandler");

const useRouter = Router();

useRouter.post('/login', passport.authenticate('local'), loginHandler)
useRouter.post('/logout', logoutHandler)
useRouter.post('/signin', signInHandler)
useRouter.get('/confirm/:token', confirmAccountHandler)
useRouter.delete("/:id", deleteActivateUserByIdHandler);

module.exports = useRouter;
