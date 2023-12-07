const { Router } = require("express");
const {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  deleteCategoryHandler,
  updateCategoryHandler,
} = require("../../handlers/categoryHandlers");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategoriesHandler);
categoryRouter.get("/:id", getCategoryByIdHandler);
categoryRouter.delete("/:id", deleteCategoryHandler);
categoryRouter.put("/:id", updateCategoryHandler);

module.exports = categoryRouter;
