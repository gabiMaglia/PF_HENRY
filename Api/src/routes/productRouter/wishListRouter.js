const { Router } = require("express");
const {
  getWishList,
} = require("../../handlers/productHandlers/wishListHandlers");

const useRoutes = Router();

useRoutes.get("/", getWishList);

module.exports = useRoutes;
