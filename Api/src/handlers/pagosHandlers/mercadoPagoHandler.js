const {
  mercadoPago,
} = require("../../controllers/pagosControllers/mercadoPagoContoller");

const mercadoPagoHandler = async (req, res) => {
  const { items } = req.body;

  try {
    const response = await mercadoPago(items);

    res.status(200).json(response.id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  mercadoPagoHandler,
};
