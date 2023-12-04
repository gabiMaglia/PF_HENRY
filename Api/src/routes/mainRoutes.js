const { Router } = require("express");
const userRoutes = require('./userRouter/userRouter')

const mainRouter = Router();

mainRouter.use("/user", userRoutes);

module.exports = mainRouter;
