const {
  filterProducts,
  orderSoldCount,
  orderPrice,
} = require("../../controllers/productControllers/filterController");

const filterProductsHandler = async (req, res) => {
  const { category, brand } = req.query;
  try {
    const response = await filterProducts(category, brand);

    if (response.length === 0) {
      res.status(404).json({ message: "No se encontraron productos." });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const orderSoldCountHandler = async (req, res) => {
  try {
    const destacados = await orderSoldCount();
    res.status(200).json({ destacados });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const orderByPriceHandler = async (req, res) => {
  const { price } = req.query;
  try {
    const orderedProducts = await orderPrice(price);
    res.status(200).json({ orderedProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  filterProductsHandler,
  orderSoldCountHandler,
  orderByPriceHandler,
};
