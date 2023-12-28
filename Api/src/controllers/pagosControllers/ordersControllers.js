const {
  Order,
  Cart,
  Product,
  ProductCart,
  OrderProduct,
  User,
} = require("../../db");
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
      cartTotal: cart.cartTotal || 0,
      trackingNumber: trackingNumber ?? null,
      shippingDetails: shippingDetails ?? null,
      customerNotes: customerNotes ?? null,
      preferenceId,
    });

    // Agregar productos a la orden y la tabla intermedia OrderProduct
    for (const product of cart.Products) {
      await order.addProduct(product, {
        through: { quantity: product.ProductCart.quantity },
      });
    }

    // Eliminar el carrito después de crear la orden
    await cart.destroy();

    // Retornar la orden con relaciones incluidas
    // return Order.findOne({
    //   where: { id: idOrder },
    //   include: [
    //     {
    //       model: Product,
    //       through: {
    //         model: OrderProduct,
    //       },
    //     },
    //   ],
    // });
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
          model: Product,
          attributes: ["id"],
          through: {
            model: OrderProduct,
          },
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

const deleteOrderById = async (id) => {
  try {
    const orderToDelete = await Order.findByPk(id);

    if (!orderToDelete) {
      throw new Error("Order not found");
    }

    await orderToDelete.destroy();
    return { orderToDelete, deleted: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getMisCompras = async (userId) => {
  try {
    const user = await User.findAll({
      where: { id: userId },
      include: [
        {
          model: Order,
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price"],
              through: {
                model: ProductCart,
                attributes: ["quantity"],
              },
              include: [
                {
                  model: ProductImage,
                  attributes: ["address"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,

  deleteOrderById,

  getMisCompras,
};
