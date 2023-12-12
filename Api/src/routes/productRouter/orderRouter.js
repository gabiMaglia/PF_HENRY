const { Router } = require("express");
const {
  orderSoldCountHandler,
  orderByPriceHandler,
} = require("../../handlers/productHandlers/filterHandlers");

const orderRouter = Router();

orderRouter.get("/destacados", orderSoldCountHandler);
orderRouter.get("", orderByPriceHandler);

module.exports = orderRouter;
