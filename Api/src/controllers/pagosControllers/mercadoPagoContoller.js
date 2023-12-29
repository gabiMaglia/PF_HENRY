const { Order, Product, OrderProduct, ProductStock } = require("../../db");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const frontend_Url = process.env.FRONTEND_URL;
const miAccessToken = process.env.MP_ACCESS_TOKEN;
const mercadopago = require("mercadopago");
const client = new MercadoPagoConfig({ accessToken: miAccessToken });

const mercadoPago = async (array, idOrder) => {
  console.log(array);
  try {
    let body = {
      metadata: { idOrder },
      items: array,
      back_urls: {
        success: `${frontend_Url}/confirmacionPago`,
        failure: `${frontend_Url}/cart`,
        pending: `${frontend_Url}/cart`,
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error al procesar el pago con MercadoPago.");
  }
};

const handlePaymentNotification = async (paymentId) => {
  try {
    const paymentInfo = await mercadopago.payment.get(paymentId);

    if (paymentInfo.status === "approved") {
      const orderId = paymentInfo.metadata;
      const order = await Order.findByPk(orderId, {
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

      if (order) {
        order.status = "finalizado";
        await order.save();

        const products = order.getProducts();

        for (const product of products) {
          const { id, soldCount } = product;
          const orderProduct = order.OrderProducts.find(
            (op) => op.ProductId === id
          );

          if (orderProduct) {
            const productQuantity = orderProduct.quantity;

            const productStock = await ProductStock.findOne({
              where: { ProductId: id },
            });

            if (productStock) {
              productStock.amount -= productQuantity;
              await productStock.save();

              soldCount += productQuantity;
              await product.save();
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error al manejar la notificación de pago:", error);
  }
};

// };
// const webhook = async (paymentId, status) => {
//   if (status === "approved") {
//     console.log(`Pago aprobado: ${paymentId}`);
//   } else {
//     console.log(`Estado de pago no manejado: ${status}`);
//   }
// };

module.exports = {
  mercadoPago,
  handlePaymentNotification,
};
