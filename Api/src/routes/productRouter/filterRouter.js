const { Router } = require("express");
const {
  filterProductsHandler,
  orderSoldCountHandler,
} = require("../../handlers/productHandlers/filterHandlers");

const filterRouter = Router();

// filterRouter.get("/:categoryName?/:brandName?", filterProductsHandler);

filterRouter.get("/destacados", orderSoldCountHandler);

module.exports = filterRouter;
