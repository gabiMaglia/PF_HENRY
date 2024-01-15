const { Router } = require("express");
const {
  postProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  logicalDeleteHandler,
  addToCarouselHandler,
  deleteProductHandler,
  searchByNameHandler,
  postProductSeveralHandler,
  getProductsCarouselHandler,
} = require("../../handlers/productHandlers/productHandlers");

const {
  checkAuthToken,
  checkRoleAuthToken,
} = require("../../middlewares/tokenAuthMiddlewares");

const productRouter = Router();

productRouter.get("/", getProductsHandler);
productRouter.get("/carousel", getProductsCarouselHandler);

productRouter.get("/search", searchByNameHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.post("/", checkAuthToken, checkRoleAuthToken(["admin"]), postProductHandler);
productRouter.post("/several", checkAuthToken, checkRoleAuthToken(["admin"]), postProductSeveralHandler);
productRouter.put("/:id", checkAuthToken, checkRoleAuthToken(["admin", "technician"]), updateProductHandler);
productRouter.put("/logicalDelete/:id", checkAuthToken, checkRoleAuthToken(["admin", 'technician']), logicalDeleteHandler);
productRouter.put("/addToCarousel/:id", checkAuthToken, checkRoleAuthToken(["admin"]), addToCarouselHandler);
productRouter.delete("/:id", checkAuthToken, checkRoleAuthToken(["admin"]), deleteProductHandler);

module.exports = productRouter;
