const { Router } = require("express");
const {
  postCartHandler,
  getAllCartsHandler,
  updateCartHandler,
} = require("../../handlers/productHandlers/cartHandlers");

const cartRouter = Router();

cartRouter.post("/", postCartHandler);

cartRouter.get("/", getAllCartsHandler);

cartRouter.put("/", updateCartHandler);

module.exports = cartRouter;
