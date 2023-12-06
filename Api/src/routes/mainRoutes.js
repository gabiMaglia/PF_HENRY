const { Router } = require("express");
const userRoutes = require("./userRouter/userRouter");
const userRoleRoutes = require("./userRouter/userRoleRouter");
const userCredentialsRoutes = require("./userRouter/userCredentialsRouter");
const userAddresseRoutes = require("./userRouter/userAddressRouter");
const productRouter = require("./productRouter/productRouter");
const serviceRouter=require('./serviceRouter/serviceRouter')
const mainRouter = Router();

mainRouter.use("/user", userRoutes);
mainRouter.use("/user_role", userRoleRoutes);
mainRouter.use("/user_credentials", userCredentialsRoutes);
mainRouter.use("/user_address", userAddresseRoutes);
mainRouter.use("/products", productRouter);
mainRouter.use('/service',serviceRouter)

module.exports = mainRouter;
