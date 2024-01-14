const { Router } = require("express");
const {
  getWishList,
  addWishItem,
  getOfferNotificationHandler,
} = require("../../handlers/productHandlers/wishListHandlers");

const useRoutes = Router();

useRoutes.get("/:id", getWishList);
useRoutes.get("/offer/:id", getOfferNotificationHandler);
useRoutes.post("/", addWishItem);

module.exports = useRoutes;
