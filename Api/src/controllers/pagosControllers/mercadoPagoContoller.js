const { MercadoPagoConfig, Preference } = require("mercadopago");
const frontend_Url = process.env.FRONTEND_URL;
const miAccessToken = process.env.MP_ACCESS_TOKEN;

const client = new MercadoPagoConfig({ accessToken: miAccessToken });

// const mercadoPago = async (name, productQuantity, productPrice, currency) => {
//   try {
//     let body = {
//       items: [
//         {
//           title: name,
//           quantity: productQuantity,
//           unit_price: productPrice,
//           currency_id: currency,
//         },
//       ],
//       back_urls: {
//         success: `${frontend_Url}/confirmacionPago`,
//         failure: `${frontend_Url}/cart`,
//         pending: `${frontend_Url}/cart`,
//       },
//       auto_return: "approved",
//     };

//     const preference = new Preference(client);
//     const result = await preference.create({ body });
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error al procesar el pago con MercadoPago.");
//   }
// };
const mercadoPago = async (items) => {
  try {
    let body = {
      items: [],
      back_urls: {
        success: `${frontend_Url}/confirmacionPago`,
        failure: `${frontend_Url}/cart`,
        pending: `${frontend_Url}/cart`,
      },
      auto_return: "approved",
    };
    items.forEach((item) => {
      body.items.push(item);
    });

    const preference = new Preference(client);
    const result = await preference.create({ body });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error al procesar el pago con MercadoPago.");
  }
};

module.exports = {
  mercadoPago,
};
