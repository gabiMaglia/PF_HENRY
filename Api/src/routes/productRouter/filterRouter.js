const { Router } = require("express");
const {
  filterProductsHandler,
} = require("../../handlers/productHandlers/filterHandlers");

const filterRouter = Router();

filterRouter.get("/", filterProductsHandler);

module.exports = filterRouter;
