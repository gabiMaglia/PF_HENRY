const { Router } = require("express");
const {
  searchByNameHandler,
} = require("../../handlers/productHandlers/productHandlers");

const searchBarRouter = Router();

searchBarRouter.get("/", searchByNameHandler);

module.exports = searchBarRouter;
