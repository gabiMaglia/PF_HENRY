const { Router } = require("express");
const {
    loginHandler,
    signInHandler,
    confirmAccountHandler
} = require("../../handlers/authHandler");

const useRouter = Router();

useRouter.post('/login', loginHandler)
useRouter.post('/signin', signInHandler)
useRouter.get('/confirm/:token', confirmAccountHandler)

module.exports = useRouter;
