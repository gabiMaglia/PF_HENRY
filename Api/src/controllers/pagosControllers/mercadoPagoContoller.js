const { MercadoPagoConfig, Preference } = require("mercadopago");
const frontend_Url = process.env.FRONTEND_URL;
const miAccessToken = process.env.MP_ACCESS_TOKEN;

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

const webhook = async (paymentId, status) => {
  if (status === "approved") {
    console.log(`Pago aprobado: ${paymentId}`);
  } else {
    console.log(`Estado de pago no manejado: ${status}`);
  }
};

module.exports = {
  mercadoPago,
};
