const { Router } = require("express");
const {
  postCartHandler,
  getAllCartsHandler,
} = require("../../handlers/productHandlers/cartHandlers");

const cartRouter = Router();

cartRouter.post("/", postCartHandler);

cartRouter.get("/", getAllCartsHandler);

module.exports = cartRouter;
