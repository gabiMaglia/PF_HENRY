const { Router } = require("express");
const {
  mercadoPagoHandler,
  mercadopagoWebhookHandler,
} = require("../../handlers/pagosHandlers/mercadoPagoHandler");
const { checkAuthToken } = require("../../middlewares/tokenAuthMiddlewares");

const {
  createOrderHandler,
  getAllOrdersHandler,
  deleteOrdersHandler,
  deleteOrderHandler,

  misComprasHandler,
} = require("../../handlers/pagosHandlers/orderHandlers");

const pagosRouter = Router();

pagosRouter.post("/", checkAuthToken, mercadoPagoHandler);
pagosRouter.post("/mercadopago-webhook", mercadopagoWebhookHandler);

pagosRouter.get("/misCompras/:id", checkAuthToken, misComprasHandler);
pagosRouter.post("/order", checkAuthToken, createOrderHandler);
pagosRouter.delete("/order/:id", checkAuthToken, deleteOrderHandler);
pagosRouter.get("/order", checkAuthToken, getAllOrdersHandler);
pagosRouter.delete("/order", checkAuthToken, deleteOrdersHandler);

module.exports = pagosRouter;
