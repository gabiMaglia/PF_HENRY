const {
  Order,
  Product,
  Cart,
  ProductCart,
  OrderProduct,
  ProductStock,
  ProductImage,
  User,
} = require("../../db");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const frontend_Url = process.env.FRONTEND_URL;
const miAccessToken = process.env.MP_ACCESS_TOKEN;
const axios = require("axios");
const mercadopago = require("mercadopago");
const client = new MercadoPagoConfig({ accessToken: miAccessToken });
const backend_Url = `https://surprising-ashlee-gabimaglia.koyeb.app`;
// const backend_Url = `https://7c03-2800-a4-2720-7100-299a-abad-2cda-a060.ngrok-free.app`;
const conn = require("../../db");
const { where } = require("sequelize");
const transporter = require("../../config/mailer");

const hyperEmail = process.env.EMAIL_MAILER;

const mercadoPago = async (array, idUser) => {
  try {
    let body = {
      metadata: { idUser },
      notification_url: `${backend_Url}/pagos/mercadopago-webhook`,
      items: array,
      back_urls: {
        success: `${frontend_Url}/customer/userPanel/shoppings?success=true`,
        failure: `${frontend_Url}/shoppingCart?payment=false`,
        pending: `${frontend_Url}/shoppingCart?payment=pending`,
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

      let user;
      let userId;
      if (payment?.data?.metadata?.id_user) {
        userId = payment.data.metadata.id_user;
        user = await User.findByPk(userId);
        const cart = await Cart.findOne({
          where: {
            UserId: userId,
          },
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price", "soldCount"],
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
        });

        const order = await Order.create({
          UserId: userId,
          paymentId: paymentId.data.id,
          status: "pending",
          purchaseDate: Date(),
        });

        await Promise.all(
          cart.Products.map(async (product) => {
            const quantity = product.ProductCart.quantity;
            await order.addProduct(product, {
              through: { quantity: quantity },
            });
          })
        );

        if (
          payment.data.status === "approved" ||
          payment.data.status === "pending"
        ) {
          if (order) {
            Promise.all(
              cart.Products.map(async (product) => {
                const { id, soldCount } = product;
                const cartProduct = await ProductCart.findOne({
                  where: { ProductId: id, CartId: cart.id },
                });
                if (cartProduct) {
                  const productQuantity = cartProduct.quantity;

                  const productStock = await ProductStock.findOne({
                    where: { ProductId: id },
                  });

                  if (productStock) {
                    await productStock.update({
                      amount: productStock.amount - productQuantity,
                    });

                    await product.update({
                      soldCount: Number(soldCount + productQuantity),
                    });
                  }
                }
              })
            );

            await order.update({
              status: payment.data.status,
              cartTotal: Number(
                payment.data.transaction_details.total_paid_amount
              ),
              paymentMethod: payment.data.payment_method.type,
            });
          }

          await sendOrderConfirmationEmail(cart.Products, user.email);
          for (const product of cart.Products) {
            await cart.removeProduct(product);
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
    const emailBody = `<div style="width: 100%">
    <h1>Gracias por tu compra. Aquí está el resumen de la compra:</h1>
    
    ${products
      .map(
        (product) => `
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; border: 1px solid #ccc; padding: 10px; margin-bottom: 20px;">
      <img style="width: 90px; height: auto; margin-bottom: 5px;" src="${escapeHTML(
        product.ProductImages[0].dataValues.address
      )}" alt="${escapeHTML(product.name)}">
      <h2 style="margin-bottom: 8px;
      
      margin-left: 4%; ">${escapeHTML(product.name)}</h2>
      <h2 style="margin-bottom: 8px; margin-left: 10%;">$${escapeHTML(
        product.price
      )}</h2>
      <h3 style="margin-left: 15%;">Cantidad: ${escapeHTML(
        product.ProductCart.dataValues.quantity
      )}</h3>
    </div>
    `
      )
      .join("")}
  </div>

  `;

    await transporter.sendMail({
      from: `Hyper Mega Red  ${hyperEmail}`,
      to: userEmail,
      subject: "Compra finalizada con éxito ✔",
      html: `${emailBody} 
     <img style="height: 180px; width:auto; " src='https://res.cloudinary.com/hypermegared/image/upload/v1704231317/wsum710gbvcgjo2ktujm.jpg'/>`,
    });
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico de confirmación de la orden:",
      error
    );
  }
};

function escapeHTML(value) {
  return typeof value === "string"
    ? value.replace(
        /[&<>"']/g,
        (match) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          }[match])
      )
    : value;
}

module.exports = {
  mercadoPago,
  handlePaymentNotification,
};
