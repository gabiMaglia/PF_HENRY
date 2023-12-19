const {
  postCart,
  getAllCarts,
  addToCart,
} = require("../../controllers/productControllers/cartControllers");

const postCartHandler = async (req, res) => {
  const { userId, productId, productQuantity, date, cartTotal } = req.body;

  try {
    const newCart = await postCart(
      userId,
      productId,
      productQuantity,
      date,
      cartTotal
    );

    if (!newCart) {
      throw new Error(error);
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

const updateCartHandler = async (req, res) => {
  const { userId, productId, productQuantity, cartMoney } = req.body;
  try {
    const updatedCarrito = await addToCart(
      userId,
      productId,
      productQuantity,
      cartMoney
    );
    if (updatedCarrito) {
      res.status(200).json({
        message: "Cart updated successfully",
        updatedCarritoCart: updatedCarrito,
      });
    } else {
      res.status(400).send("not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postCartHandler,
  getAllCartsHandler,
  updateCartHandler,
};
