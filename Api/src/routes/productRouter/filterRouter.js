const { Router } = require("express");
const {
  filterProductsHandler,
} = require("../../handlers/product/filterHandlers");

const filterRouter = Router();

filterRouter.get("/:categoryName?/:brandName?", filterProductsHandler);

module.exports = filterRouter;
