const { Router } = require("express");
const {
  postProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("../../handlers/product/productHandlers");

const productRouter = Router();

productRouter.get("/", getProductsHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.post("/", postProductHandler);
productRouter.put("/:id", updateProductHandler);
productRouter.delete("/:id", deleteProductHandler);

module.exports = productRouter;
