const {
  Order,
  Cart,
  Product,
  ProductCart,
  OrderProduct,
  User,
  ProductImage,
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
      return "El usuario no tiene un carrito";
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return "Usuario no encontrado";
    }
    const userEmail = user.email;

    const idOrder = uuidv4();
    const preferenceResult = await mercadoPago(array, idOrder);

    const preferenceId = preferenceResult.id;

    const order = await Order.create({
      id: idOrder,
      UserId: userId,
      userEmail,
      totalAmount,
      shippingAddress: shippingAddress ?? null,
      paymentMethod,
      cartTotal: cart.cartTotal || 0,
      trackingNumber: trackingNumber ?? null,
      shippingDetails: shippingDetails ?? null,
      customerNotes: customerNotes ?? null,
      preferenceId,
    });
    await Promise.all(
      cart.Products.map(async (product) => {
        return order.addProduct(product, {
          through: { quantity: product.ProductCart.quantity },
        });
      })
    );

    const newOrder = await Order.findOne({
      where: { id: idOrder },
      include: [
        {
          model: Product,
          through: {
            model: OrderProduct,
          },
        },
      ],
    });

    for (const product of cart.Products) {
      await cart.removeProduct(product);
    }
    return newOrder;
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
    const userOrders = await Order.findAll({
      where: { UserId: userId },
      attributes: ["status", "cartTotal"],
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price"],
          through: {
            model: OrderProduct,
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
    });

    if (!userOrders) {
      throw new Error("User not found or has no orders");
    }

    return userOrders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOrdersController = async (req, res) => {
  const orders = await Order.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "name"],
        through: {
          model: OrderProduct,
          attributes: ["quantity"],
        },
      },
    ],
  });
  console.log(orders[0].OrderProducts);
  Promise.all(orders.map((order) => order.destroy()));
};

//LUEGO DE QUE TERMINEMMOS MERCADO PAGO ESTA VA A SER LA FUNCION QUE SE VA A USAR
// const getMisCompras = async (userId) => {
//   try {
//     const user = await User.findAll({
//       where: { id: userId },
//       include: [
//         {
//           model: Order,
//           where: { status: 'finished' },
//           include: [
//             {
//               model: Product,
//               attributes: ["id", "name", "price"],
//               through: {
//                 model: OrderProduct,
//                 attributes: ["quantity"],
//               },
//               include: [
//                 {
//                   model: ProductImage,
//                   attributes: ["address"],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     return user;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrderById,
  getMisCompras,
  deleteOrdersController,
};
