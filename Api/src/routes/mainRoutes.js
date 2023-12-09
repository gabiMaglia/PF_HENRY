const { Router } = require("express");

const {loginHandler} = require('../handlers/authHandler')

const {checkAuthToken, checkRoleAuthToken} = require('../middlewares/tokenAuthMiddlewares')

// USER ROUTERS
const userRoutes = require("./userRouter/userRouter");
const userRoleRoutes = require("./userRouter/userRoleRouter");
const userCredentialsRoutes = require("./userRouter/userCredentialsRouter");
// PRODUCT ROUTERS
const productRouter = require("./productRouter/productRouter");
const brandRouter = require("./productRouter/productBrandRouter");
const categoryRouter = require("./productRouter/productCategoryRouter");
const stockRouter = require("./productRouter/productStockRouter");
const imageRouter = require("./productRouter/productImagesRouter");
// SERVICES ROUTERS
const serviceRouter = require("./serviceRouter/serviceRouter");

const mainRouter = Router();
// auth
mainRouter.post('/login', loginHandler)
// UserRoutes

mainRouter.use("/user", userRoutes);
mainRouter.use("/user_role", checkRoleAuthToken(['admin']), userRoleRoutes);
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
