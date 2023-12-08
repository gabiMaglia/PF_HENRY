const { Router } = require("express");
const {
  getAllBrandsHandler,
  getBrandByIdHandler,
  deleteBrandHandler,
  updateBrandHandler,
  getBrandWithProductsHandler,
} = require("../../handlers/brandHandlers");

const brandRouter = Router();

brandRouter.get("/", getAllBrandsHandler);
brandRouter.get("/:id", getBrandByIdHandler);
brandRouter.get("/filter/:name", getBrandWithProductsHandler);
brandRouter.delete("/:id", deleteBrandHandler);
brandRouter.put("/:id", updateBrandHandler);

module.exports = brandRouter;
