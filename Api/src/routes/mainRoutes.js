const { Router } = require("express");

const {
  checkAuthToken,
  checkRoleAuthToken,
} = require("../middlewares/tokenAuthMiddlewares");
// AUTH ROUTERS
const accountRouter = require("./userRouter/accountRouter/accountRouter");
const googleRouter = require("./userRouter/accountRouter/googleRoutes");
// GOOGLEPLACE ROUTER
const googleReviewsRoutes = require("./googleRouter/googleReviewsRouter");
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
const orderRouter = require("./productRouter/orderRouter");
const pagosRouter = require("./pagosRouter/pagosRouter");
const cartRouter = require("./cartRouter/cartRouter");
const filterRouter = require("./productRouter/filterRouter");
const WishListRouter = require("./productRouter/wishListRouter");
// SERVICES ROUTERS
const serviceRouter = require("./serviceRouter/serviceRouter");

// , checkRoleAuthToken(['customer', "admin", "technician"])

const mainRouter = Router();

// auth
mainRouter.use("/account", accountRouter);
mainRouter.use("/auth", googleRouter);
// GoogleRoute
mainRouter.use("/places", googleReviewsRoutes);
// UserRoutes
mainRouter.use("/user", userRoutes);
mainRouter.use("/user_role", checkAuthToken,  userRoleRoutes);
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
mainRouter.use("/filter", filterRouter);
mainRouter.use("/order", orderRouter);
mainRouter.use("/pagos", checkAuthToken, pagosRouter);
mainRouter.use("/cart", cartRouter);
mainRouter.use("/wishList", checkAuthToken, checkRoleAuthToken(['customer']), WishListRouter);
// ServicesRoute
mainRouter.use("/service", serviceRouter);

module.exports = mainRouter;
