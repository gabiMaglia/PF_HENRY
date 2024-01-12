const {
  mercadoPago,
  handlePaymentNotification,
} = require("../../controllers/pagosControllers/mercadoPagoContoller");

const mercadoPagoHandler = async (req, res) => {
  const { array, userId } = req.body;
  console.log(array);

  try {
    const response = await mercadoPago(array, userId);
    res.status(200).json(response.id);
  } catch (error) {
    console.log(error);
  }
};

const mercadopagoWebhookHandler = async (req, res) => {
  try {
    const paymentId = req.body;
    await handlePaymentNotification(paymentId);
    res.status(200).json(paymentId);
  } catch (error) {
    console.error("Error en el manejador de webhook de MercadoPago:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  mercadoPagoHandler,
  mercadopagoWebhookHandler,
};
