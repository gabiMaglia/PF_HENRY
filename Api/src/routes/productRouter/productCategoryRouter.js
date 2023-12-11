const { Router } = require("express");
const {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  deleteCategoryHandler,
  updateCategoryHandler,
  getCategoriesWithProductsHandler,
} = require("../../handlers/productHandlers/categoryHandlers");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategoriesHandler);
categoryRouter.get("/:id", getCategoryByIdHandler);
categoryRouter.get("/filter/:name", getCategoriesWithProductsHandler);
categoryRouter.delete("/:id", deleteCategoryHandler);
categoryRouter.put("/:id", updateCategoryHandler);

module.exports = categoryRouter;
