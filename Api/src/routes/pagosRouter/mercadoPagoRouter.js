const { Router } = require("express");
const {
  mercadoPagoHandler,
} = require("../../handlers/pagosHandlers/mercadoPagoHandler");

const mercadoPagoRouter = Router();

mercadoPagoRouter.get("/", mercadoPagoHandler);

module.exports = mercadoPagoRouter;
