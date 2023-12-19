const { Router } = require("express");
const {
  getWishList,
  addWishItem,
} = require("../../handlers/productHandlers/wishListHandlers");

const useRoutes = Router();

useRoutes.get("/", getWishList);
useRoutes.post("/", addWishItem);

module.exports = useRoutes;
  