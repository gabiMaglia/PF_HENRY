const {
  mercadoPago,
} = require("../../controllers/pagosControllers/mercadoPagoContoller");

const mercadoPagoHandler = async (req, res) => {
  const { title, quantity, price } = req.body;
  const currency_id = "ARS";

  try {
    const response = await mercadoPago(title, quantity, price, currency_id);

    res.status(200).json(response.id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  mercadoPagoHandler,
};
