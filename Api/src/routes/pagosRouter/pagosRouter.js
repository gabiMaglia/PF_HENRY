const { Router } = require("express");
const {
  mercadoPagoHandler,
} = require("../../handlers/pagosHandlers/mercadoPagoHandler");

const {
  createOrderHandler,
} = require("../../handlers/pagosHandlers/orderHandlers");

const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/", mercadoPagoHandler);

mercadoPagoRouter.post("/order", createOrderHandler);

module.exports = mercadoPagoRouter;
