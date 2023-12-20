const { Order, Cart, Product, ProductCart } = require("../../db");

async function createOrder(
  userId,
  shippingAddress,
  paymentMethod,
  totalAmount,
  trackingNumber,
  shippingDetails,
  customerNotes
) {
  try {
    const cart = await Cart.findOne({
      where: {
        UserId: userId,
      },
      include: [
        {
          model: Product,
          attributes: ["id"],
          through: {
            model: ProductCart,
            attributes: ["quantity"],
          },
        },
      ],
    });

    if (!cart) {
      throw new Error("El usuario no tiene un carrito");
    }

    const order = await Order.create({
      userId,
      totalAmount,
      shippingAddress: shippingAddress ?? null,
      paymentMethod,
      products: cart.Products,
      cartTotal: cart.cartTotal,
      trackingNumber: trackingNumber ?? null,
      shippingDetails: shippingDetails ?? null,
      customerNotes: customerNotes ?? null,
    });

    await cart.destroy();

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { createOrder };
