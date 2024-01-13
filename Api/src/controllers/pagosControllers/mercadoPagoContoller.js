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
// const backend_Url = `https://surprising-ashlee-gabimaglia.koyeb.app`;
const backend_Url = `https://7c03-2800-a4-2720-7100-299a-abad-2cda-a060.ngrok-free.app`;
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

        for (const product of cart.Products) {
          const quantity = product.ProductCart.quantity;

          await order.addProduct(product, { through: { quantity: quantity } });
        }

        // for (const product of cart.Products) {
        //   await cart.removeProduct(product);
        // }

        if (
          payment.data.status === "approved" ||
          payment.data.status === "pending"
        ) {
          if (order) {
            await order.update({
              status: payment.data.status,
              cartTotal: Number(
                payment.data.transaction_details.total_paid_amount
              ),
              paymentMethod: payment.data.payment_method.type,
            });
            await sendOrderConfirmationEmail(cart.Products, user.email);

            Promise.all(
              cart.Products.map(async (product) => {
                console.log(product.ProductImages[0].dataValues);
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
