const { Router } = require("express");
const userRoutes = require("./userRouter/userRouter");
const productRouter = require("./productRouter/productRouter");
const serviceRouter=require('./serviceRouter/serviceRouter')
const mainRouter = Router();

mainRouter.use("/user", userRoutes);
mainRouter.use("/products", productRouter);
mainRouter.use('/service',serviceRouter)

module.exports = mainRouter;
