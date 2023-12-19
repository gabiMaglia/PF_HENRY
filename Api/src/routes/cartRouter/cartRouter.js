const { Router } = require("express");
const {
  postCartHandler,
  getAllCartsHandler,
  addToCartHandler,
  cartByIdHandler,
  deleteCartHandler,
} = require("../../handlers/productHandlers/cartHandlers");

const cartRouter = Router();

cartRouter.post("/", postCartHandler);

cartRouter.get("/", getAllCartsHandler);

cartRouter.put("/", addToCartHandler);

cartRouter.get("/:id", cartByIdHandler);

cartRouter.delete("/:id", deleteCartHandler);

module.exports = cartRouter;
