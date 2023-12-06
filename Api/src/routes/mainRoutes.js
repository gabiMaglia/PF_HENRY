const { Router } = require("express");
const userRoutes = require("./userRouter/userRouter");
const userRoleRoutes = require("./userRouter/userRoleRouter");
const userCredentialsRoutes = require("./userRouter/userCredentialsRouter");
const productRouter = require("./productRouter/productRouter");
const serviceRouter=require('./serviceRouter/serviceRouter')
const mainRouter = Router();

// UserRoutes
mainRouter.use("/user", userRoutes);
mainRouter.use("/user_role", userRoleRoutes);
mainRouter.use("/user_credentials", userCredentialsRoutes);
// ProductRoute
mainRouter.use("/products", productRouter);

// ServicesRoute
mainRouter.use('/service',serviceRouter)

module.exports = mainRouter;
