const { Order, Cart, Product, ProductCart, User } = require("../../db");
const { v4: uuidv4 } = require("uuid");
const { mercadoPago } = require("./mercadoPagoContoller");
async function createOrder(
  userId,
  shippingAddress,
  paymentMethod,
  totalAmount,
  trackingNumber,
  shippingDetails,
  customerNotes,
  array
) {
  try {
    console.log(
      "Entrando en createOrder con datos:",
      userId,
      shippingAddress,
      paymentMethod,
      totalAmount,
      trackingNumber,
      shippingDetails,
      customerNotes,
      array
    );

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
    const idOrder = uuidv4();
    console.log(idOrder);
    const preferenceResult = await mercadoPago(array, idOrder);

    const preferenceId = preferenceResult.id;
    const order = await Order.create({
      id: idOrder,
      UserId: userId,
      totalAmount,
      shippingAddress: shippingAddress ?? null,
      paymentMethod,
      products: cart.Products,
      cartTotal: cart.cartTotal || 0,
      trackingNumber: trackingNumber ?? null,
      shippingDetails: shippingDetails ?? null,
      customerNotes: customerNotes ?? null,
      preferenceId,
    });

    // await cart.destroy();

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getAllOrders = async () => {
  try {
    const allCarts = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id"],
        },
      ],
    });

    return allCarts;
  } catch (error) {
    console.log(error.message);
    throw new Error({ error: error.message });
  }
};

async function updateOrder(orderId, updatedFields) {
  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    await order.update(updatedFields);

    await order.reload();

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
};
