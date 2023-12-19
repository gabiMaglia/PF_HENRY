const { Router } = require("express");
const {
  postCartHandler,
  getAllCartsHandler,
  addToCartHandler,
  cartByIdHandler,
} = require("../../handlers/productHandlers/cartHandlers");

const cartRouter = Router();

cartRouter.post("/", postCartHandler);

cartRouter.get("/", getAllCartsHandler);

cartRouter.put("/", addToCartHandler);

cartRouter.get("/:id", cartByIdHandler);

module.exports = cartRouter;
