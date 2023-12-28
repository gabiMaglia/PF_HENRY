const { Router } = require("express");
const {
  mercadoPagoHandler,
} = require("../../handlers/pagosHandlers/mercadoPagoHandler");

const {
  createOrderHandler,
  getAllOrdersHandler,

  deleteOrderHandler,

  misComprasHandler,
} = require("../../handlers/pagosHandlers/orderHandlers");

const pagosRouter = Router();

pagosRouter.post("/", mercadoPagoHandler);
pagosRouter.get("/misCompras/:id", misComprasHandler);
pagosRouter.post("/order", createOrderHandler);
pagosRouter.delete("/order/:id", deleteOrderHandler);
pagosRouter.get("/order", getAllOrdersHandler);

module.exports = pagosRouter;
