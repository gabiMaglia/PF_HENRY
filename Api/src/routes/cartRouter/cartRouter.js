const { Router } = require("express");
const {
  postCartHandler,
  getAllCartsHandler,
  addToCartHandler,
  cartByIdHandler,
  deleteCartHandler,
  removeFromCartHandler,
  editQuantityHandler,
} = require("../../handlers/productHandlers/cartHandlers");

const cartRouter = Router();

cartRouter.post("/", postCartHandler);

cartRouter.get("/", getAllCartsHandler);

cartRouter.put("/add", addToCartHandler);

cartRouter.put("/remove", removeFromCartHandler);

cartRouter.put("/edit", editQuantityHandler);

cartRouter.get("/:id", cartByIdHandler);

cartRouter.delete("/:id", deleteCartHandler);

module.exports = cartRouter;
