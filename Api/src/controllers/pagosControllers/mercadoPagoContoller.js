const { MercadoPagoConfig, Preference } = require("mercadopago");
const frontend_Url = process.env.FRONTEND_URL;
const miAccessToken = process.env.MP_ACCESS_TOKEN;

const client = new MercadoPagoConfig({ accessToken: miAccessToken });

const mercadoPago = async (array) => {
  console.log(array)
  try {
    let body = {
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

module.exports = {
  mercadoPago,
};
