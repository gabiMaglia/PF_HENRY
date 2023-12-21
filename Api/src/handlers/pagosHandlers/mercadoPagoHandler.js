const {
  mercadoPago,
} = require("../../controllers/pagosControllers/mercadoPagoContoller");

const mercadoPagoHandler = async (req, res) => {
  
  const array  = req.body;

  try {
    const response = await mercadoPago(array);

    res.status(200).json(response.id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  mercadoPagoHandler,
};
