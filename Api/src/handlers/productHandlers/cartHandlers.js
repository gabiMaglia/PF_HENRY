const {
  addToCartController,
  getAllCarts,
} = require("../../controllers/productControllers/cartControllers");

const postCartHandler = async (req, res) => {
  const { userId, productId, productQuantity, date, cartTotal } = req.body;

  try {
    const newCart = await addToCartController(
      userId,
      productId,
      productQuantity,
      date,
      cartTotal
    );

    if (!newCart) {
      throw new Error("Error al agregar el producto al carrito");
    }

    res
      .status(201)
      .json({ message: "Cart created successfully", Cart: newCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCartsHandler = async (req, res) => {
  try {
    const allCarts = await getAllCarts();
    res.status(200).json(allCarts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postCartHandler,
  getAllCartsHandler,
};
