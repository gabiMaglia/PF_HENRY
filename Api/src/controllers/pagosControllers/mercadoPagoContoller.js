const { Order, Product, OrderProduct, ProductStock } = require("../../db");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const frontend_Url = process.env.FRONTEND_URL;
const miAccessToken = process.env.MP_ACCESS_TOKEN;
const axios = require("axios");
const mercadopago = require("mercadopago");
const client = new MercadoPagoConfig({ accessToken: miAccessToken });
const backend_Url = `https://surprising-ashlee-gabimaglia.koyeb.app`;
const conn = require("../../db");
const { where } = require("sequelize");
const transporter = require("../../config/mailer");

const hyperEmail = process.env.EMAIL_MAILER;

const mercadoPago = async (array, idOrder) => {
  try {
    let body = {
      metadata: { idOrder },
      notification_url: `${backend_Url}/pagos/mercadopago-webhook`,
      items: array,
      back_urls: {
        success: `${frontend_Url}/customer/userPanel/shoppings?success=true`,
        failure: `${frontend_Url}/cart`,
        pending: `${frontend_Url}/cart`,
      },
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
    if (paymentId?.type === "payment") {
      console.log(paymentId);
      const payment = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId.data.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${miAccessToken}`,
          },
        }
      );
      if (payment.data.status === "approved") {
        const orderId = payment.data.metadata.id_order;
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
          const products = await order.getProducts();

          await order.update({
            status: "Finalizado",
            cartTotal: Number(
              payment.data.transaction_details.total_paid_amount
            ),
          });

          Promise.all(
            products.map(async (product) => {
              const { id, soldCount } = product;
              const orderProduct = await OrderProduct.findOne({
                where: { ProductId: id, OrderId: orderId },
              });
              if (orderProduct) {
                const productQuantity = orderProduct.quantity;

                const productStock = await ProductStock.findOne({
                  where: { ProductId: id },
                });

                if (productStock) {
                  await productStock.update({
                    amount: productStock.amount - productQuantity,
                  });

                  await product.update({
                    soldCount: soldCount + productQuantity,
                  });
                }
              }
            })
          );
        }
      }
    }
  } catch (error) {
    console.error("Error al manejar la notificación de pago:", error);
  }
};
const sendOrderConfirmationEmail = async (order, products) => {
  try {
    await transporter.sendMail({
      from: `Hyper Mega Red  ${hyperEmail}`,
      to: order.userEmail,
      subject: "Compra finalizada con éxito ✔",
      html: `Gracias por tu compra. Resumen de la compra: ${JSON.stringify(
        products,
        null,
        2
      )}
     <img src='https://res.cloudinary.com/hypermegared/image/upload/v1704231317/wsum710gbvcgjo2ktujm.jpg'/>`,
    });
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico de confirmación de la orden:",
      error
    );
  }
};

module.exports = {
  mercadoPago,
  handlePaymentNotification,
};
