const { Router } = require("express");
const {loginHandler} = require('../handlers/authHandler')

const {checkAuthToken} = require('../controllers/authController')

const userRoutes = require("./userRouter/userRouter");
const userRoleRoutes = require("./userRouter/userRoleRouter");
const userCredentialsRoutes = require("./userRouter/userCredentialsRouter");
const productRouter = require("./productRouter/productRouter");
const serviceRouter = require("./serviceRouter/serviceRouter");
const brandRouter = require("./productRouter/productBrandRouter");
const categoryRouter = require("./productRouter/productCategoryRouter");

const stockRouter = require("./productRouter/productStockRouter");
 
const imageRouter = require("./productRouter/productImagesRouter");

const mainRouter = Router();

mainRouter.post('/login', loginHandler)
//checkAuthToken,
// UserRoutes
mainRouter.use("/user",userRoutes);
mainRouter.use("/user_role", userRoleRoutes);
mainRouter.use("/user_credentials", userCredentialsRoutes);

// ProductRoute
mainRouter.use("/product", productRouter);
mainRouter.use("/brand", brandRouter);
mainRouter.use("/category", categoryRouter);

mainRouter.use("/stock", stockRouter);

mainRouter.use("/image", imageRouter);


// ServicesRoute
mainRouter.use("/service", serviceRouter);

module.exports = mainRouter;
