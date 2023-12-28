const { Router } = require("express");
const {
  mercadoPagoHandler,
} = require("../../handlers/pagosHandlers/mercadoPagoHandler");

const {
  createOrderHandler,
  getAllOrdersHandler,
  misComprasHandler,
} = require("../../handlers/pagosHandlers/orderHandlers");

const pagosRouter = Router();

pagosRouter.post("/", mercadoPagoHandler);
pagosRouter.get("/misCompras/:id", misComprasHandler);
pagosRouter.post("/order", createOrderHandler);

pagosRouter.get("/order", getAllOrdersHandler);

module.exports = pagosRouter;
