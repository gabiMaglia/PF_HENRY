const { Router } = require("express");
const {
  getAllStockHandler,
  getStockByIdHandler,
  deleteStockHandler,
  updateStockHandler,
} = require("../../handlers/stockHandler");

const stockRouter = Router();

stockRouter.get("/", getAllStockHandler);
stockRouter.get("/:id", getStockByIdHandler);
stockRouter.delete("/:id", deleteStockHandler);
stockRouter.put("/:id", updateStockHandler);

module.exports = stockRouter;
