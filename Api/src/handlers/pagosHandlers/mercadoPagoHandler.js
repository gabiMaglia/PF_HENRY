const {
  mercadoPago,
  handlePaymentNotification,
} = require("../../controllers/pagosControllers/mercadoPagoContoller");

const mercadoPagoHandler = async (req, res) => {
  const array = req.body;
  console.log(array)

  try {
    const response = await mercadoPago(array);

    res.status(200).json(response.id);
  } catch (error) {
    console.log(error);
  }
};

const mercadopagoWebhookHandler = async (req, res) => {
  try {
    const paymentId = req.body.id;
    await handlePaymentNotification(paymentId);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error en el manejador de webhook de MercadoPago:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  mercadoPagoHandler,
  mercadopagoWebhookHandler,
};
