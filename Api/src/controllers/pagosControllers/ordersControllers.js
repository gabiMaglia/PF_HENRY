const { Order, Cart } = require("../../db");

async function createOrder(req, res) {
  try {
    const { userId } = req.body;

    // Verificar si el usuario tiene un carrito
    const cart = await Cart.findOne({ where: { userId }, include: "Products" });

    if (!cart) {
      return res.status(404).json({ error: "El usuario no tiene un carrito" });
    }

    // Crear una nueva orden basada en el contenido del carrito
    const order = await Order.create({
      userId,
      totalAmount: cart.totalAmount, // Puedes ajustar cómo calculas el monto total
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      // Otros campos de la orden que desees incluir
    });

    // Asociar productos del carrito a la orden
    await order.addProducts(cart.Products, { through: { quantity: 1 } });

    // Eliminar el carrito después de crear la orden (puedes ajustar esto según tus necesidades)
    await cart.destroy();

    res.status(201).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la orden de compra" });
  }
}

module.exports = { createOrder };
