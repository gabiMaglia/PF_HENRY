const { Product, Cart } = require("../../db");

async function addToCart(req, res, next) {
  try {
    const { userId, productId, quantity } = req.body;

    // Verificar si el usuario tiene un carrito
    let cart = await Cart.findOne({
      where: { userId },
      include: [{ model: Product }],
    });

    if (!cart) {
      cart = await Cart.create({ userId });
    }

    const existingProduct = cart.Products.find(
      (product) => product.id === productId
    );

    if (existingProduct) {
      existingProduct.CartProduct.quantity += quantity;
      await existingProduct.CartProduct.save();
    } else {
      const product = await Product.findByPk(productId);
      await cart.addProduct(product, { through: { quantity } });
    }

    cart = await Cart.findOne({
      where: { userId },
      include: [{ model: Product }],
    });

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
}

module.exports = { addToCart };
