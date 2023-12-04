const { Router } = require("express");
const {
  postProductHandler,
  getProductsHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("../../handlers/productHandlers");

const productRouter = Router();

productRouter.get("/", getProductsHandler);
productRouter.post("/", postProductHandler);
productRouter.put("/:id", updateProductHandler);
productRouter.delete("/:id", deleteProductHandler);

module.exports = productRouter;
