const { Router } = require("express");
const userRoutes = require("./userRouter/userRouter");
const productRouter = require("./productRouter/productRouter");
const mainRouter = Router();

mainRouter.use("/user", userRoutes);
mainRouter.use("/products", productRouter);

module.exports = mainRouter;
