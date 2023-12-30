const { Router } = require("express");
const {
  postProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
  searchByNameHandler,
  postProductSeveralHandler,
} = require("../../handlers/productHandlers/productHandlers");

const productRouter = Router();

productRouter.get("/", getProductsHandler);
productRouter.get("/search", searchByNameHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.post("/", postProductHandler);
productRouter.post("/several", postProductSeveralHandler);
productRouter.put("/:id", updateProductHandler);
productRouter.delete("/:id", deleteProductHandler);

module.exports = productRouter;
