const { Router } = require("express");
const {
  getAllBrandsHandler,
  getBrandByIdHandler,
  deleteBrandHandler,
  updateBrandHandler,
} = require("../../handlers/brandHandlers");

const brandRouter = Router();

brandRouter.get("/", getAllBrandsHandler);
brandRouter.get("/:id", getBrandByIdHandler);
brandRouter.delete("/:id", deleteBrandHandler);
brandRouter.put("/:id", updateBrandHandler);

module.exports = brandRouter;
