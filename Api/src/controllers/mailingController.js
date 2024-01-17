const transporter = require("./../config/mailer");

const supportMailController = async (
  name,
  phone,
  email,
  content,
  destinationEmail
) => {
  return transporter
    .sendMail({
      from: email,
      to: destinationEmail,
      subject: `Consulta de soporte de ${name}`,
      html: `<p>${content}</p>  <b>mi numero de telefono es ${phone} y mi correo es ${email}</b>`,
    })
    .then(() => {
      return {
        success: true,
        response: `Su consulta fue enviada correctamente`,
      };
    });
};

module.exports = { supportMailController };
