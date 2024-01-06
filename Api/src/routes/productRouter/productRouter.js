const { Router } = require("express");
const {
  postProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  logicalDeleteHandler,
  deleteProductHandler,
  searchByNameHandler,
  postProductSeveralHandler,
  getProductsCarouselHandler,
} = require("../../handlers/productHandlers/productHandlers");

const productRouter = Router();

productRouter.get("/", getProductsHandler);
productRouter.get("/carousel", getProductsCarouselHandler);

productRouter.get("/search", searchByNameHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.post("/", postProductHandler);
productRouter.post("/several", postProductSeveralHandler);
productRouter.put("/:id", updateProductHandler);
productRouter.put("/logicalDelete/:id", logicalDeleteHandler);
productRouter.delete("/:id", deleteProductHandler);

module.exports = productRouter;
