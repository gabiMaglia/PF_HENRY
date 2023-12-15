const { Router } = require("express");
const {
  mercadoPagoHandler,
} = require("../../handlers/pagosHandlers/mercadoPagoHandler");

const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/", mercadoPagoHandler);

module.exports = mercadoPagoRouter;
