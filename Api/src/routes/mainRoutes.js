const { Router } = require("express");

const {
  checkAuthToken,
  checkRoleAuthToken,
} = require("../middlewares/tokenAuthMiddlewares");
// AUTH ROUTERS
const accountRouter = require("./userRouter/accountRouter/accountRouter");
const googleRouter = require("./userRouter/accountRouter/googleRoutes");
// USER ROUTERS
const userRoutes = require("./userRouter/userRouter");
const userRoleRoutes = require("./userRouter/userRoleRouter");
const userCredentialsRoutes = require("./userRouter/userCredentialsRouter");
// MAIL ROUTERS
const mailRouter = require("./mailingRouter/mailRouter");
// PRODUCT ROUTERS
const productRouter = require("./productRouter/productRouter");
const brandRouter = require("./productRouter/productBrandRouter");
const categoryRouter = require("./productRouter/productCategoryRouter");
const stockRouter = require("./productRouter/productStockRouter");
const imageRouter = require("./productRouter/productImagesRouter");
const searchBarRouter = require("./productRouter/searchRouter");
// SERVICES ROUTERS
const serviceRouter = require("./serviceRouter/serviceRouter");

const mainRouter = Router();

// auth
mainRouter.use("/account", accountRouter);
mainRouter.use("/auth", googleRouter);

// UserRoutes
mainRouter.use("/user", userRoutes);
mainRouter.use("/user_role", checkRoleAuthToken(["customer"]), userRoleRoutes);
mainRouter.use("/user_credentials", userCredentialsRoutes);
// MailingRoute
mainRouter.use("/mailer/", mailRouter);
// ProductRoute
mainRouter.use("/product", productRouter);
mainRouter.use("/brand", brandRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/stock", stockRouter);
mainRouter.use("/image", imageRouter);
mainRouter.use("/search", searchBarRouter);

// ServicesRoute
mainRouter.use("/service", serviceRouter);

module.exports = mainRouter;
