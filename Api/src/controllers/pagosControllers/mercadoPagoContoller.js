const {
  Order,
  Product,
  Cart,
  ProductCart,
  OrderProduct,
  ProductStock,
  User,
} = require("../../db");
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
      const payment = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId.data.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${miAccessToken}`,
          },
        }
      );
      let order;
      let orderId;
      if (payment?.data?.metadata?.id_order) {
        orderId = payment.data.metadata.id_order;
        order = await Order.findByPk(orderId, {
          include: [
            {
              model: Product,
              attributes: ["id", "name"],
              through: {
                model: OrderProduct,
                attributes: ["quantity"],
              },
            },
            {
              model: User,
              attributes: ["id", "name", "email"],
            },
          ],
        });

        const cart = await Cart.findOne({
          where: {
            UserId: order.User.dataValues.id,
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

        for (const product of cart.Products) {
          await cart.removeProduct(product);
        }

        if (payment.data.status === "approved") {
          if (order) {
            const products = await order.getProducts({
              include: ProductImage,
            });
            console.log(products);
            await order.update({
              status: "Finalizado",
              cartTotal: Number(
                payment.data.transaction_details.total_paid_amount
              ),
              paymentMethod: payment.data.payment_method.type,
            });
            await sendOrderConfirmationEmail(
              products,
              order.User.dataValues.email
            );

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
    }
  } catch (error) {
    console.error("Error al manejar la notificación de pago:", error);
  }
};
const sendOrderConfirmationEmail = async (products, userEmail) => {
  try {
    const productsHtml = products
      .map(
        (product) => `
    <div>
      <h2>${product.name}</h2>

      <h3>${product.price}</h3>

    </div>
  `
      )
      .join("");

    const emailBody = `
    <p>Gracias por tu compra. Aquí está el resumen de la compra:</p>
    
        ${productsHtml}
        <p>${products}</p>

    <img src='https://res.cloudinary.com/hypermegared/image/upload/v1704231317/wsum710gbvcgjo2ktujm.jpg'/>
  `;

    await transporter.sendMail({
      from: `Hyper Mega Red  ${hyperEmail}`,
      to: userEmail,
      subject: "Compra finalizada con éxito ✔",
      html: `${emailBody} 
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
