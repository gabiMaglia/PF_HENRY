const { Router } = require("express");
const passport = require("passport");
const {
    loginHandler,
    logoutHandler,
    signInHandler,
    confirmAccountHandler
} = require("../../../handlers/accountHandlers/authHandler");

const useRouter = Router();

useRouter.post('/login', passport.authenticate('local'), loginHandler)
useRouter.post('/logout', logoutHandler)
useRouter.post('/signin', signInHandler)
useRouter.get('/confirm/:token', confirmAccountHandler)

module.exports = useRouter;
