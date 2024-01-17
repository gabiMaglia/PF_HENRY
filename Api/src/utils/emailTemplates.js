const transporter = require("../config/mailer");

const sendConfirmationEmail = async (
  adminEmail,
  userEmail,
  jwtToken,
  gateway
) => {
   console.log({tokenTemplate: jwtToken})
  const confirmationUrl = `${gateway}/account/confirm/${jwtToken}`;


  return transporter
    .sendMail({
      from: adminEmail,
      to: userEmail,
      subject: "Confirma tu direccion de correo para poder continuar!",
      html: `
      <div
      style="
       background: linear-gradient(to top, #fd611a, white);
       width: 100%;
       max-width: 600px;
       filter: brightness(80%);
       height: auto;
       border-radius: 20px;
      "
      >
      <table
        style="
        width: 100%;
        max-width: 500px;
        height: auto;
        background: linear-gradient(to bottom, black, white);
        margin: 2px auto;
        border: solid 1px white;
        align-items: center;
        "
      >
        <tr>
          <td>
            <a href="https://pf-henry-sepia.vercel.app/">
            <img src="https://res.cloudinary.com/hypermegared/image/upload/v1704925814/jwnogqatk0b1jdmpfrzz.png" alt="logo" style="width: 100px;height: 100px; margin: 0 200px 0 200px ;">
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <p
              style="
                font-size: 10px;
                text-align: center;
                margin: 15px 50px 0 50px;
                color: white;
                font-weight: bold;
              "
            >
              Al hacer clic en el siguiente botón, confirmas que deseas ingresar a
              nuestro sitio web. Si no has solicitado este acceso, por favor, no
              hagas clic en el botón. Gracias.
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p
              style="
                font-size: 1.2em;
                text-align: center;
                color: white;
                font-weight: bold;
              "
            >
              Por favor confirme su email
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <a href="${confirmationUrl}" >
              <button
                style="
                  align-items: center;
                  width: 200px;
                  height: 50px;
                  background-color: rgb(253, 97, 26);
                  color: white;
                  font-size: 1em;
                  font-weight: bold;
                  border-radius: 10px;
                  margin: 0 150px 0 150px;
                "
              >
                Confirmar Email
              </button>
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <p
              style="
                font-size: 15px;
                text-align: center;
                color: black;
                font-weight: bolder;
                margin: 15px 50px 0px 50px;
                text-shadow: 0.5px 0px 0px rgb(255, 255, 255),
                  0px 0.5px 0px rgb(255, 255, 255), -0.5px 0px 0px rgb(255, 255, 255),
                  0px -0.5px 0px rgb(255, 255, 255);
              "
            >
              Si tienes algun problema con el boton de arriba, copia y pega el
              siguiente 
            </p>
          </td>
        </tr>
        <tr>
          <td style="text-align:start; margin: 0 150px 0 150px;max-width: 300px;">
            <b style="max-width: 300px; font-size: small; color: black;word-break: break-all;">${confirmationUrl}</b>
          </td>
        </tr>
        <tr>
          <td>
            <a href="https://pf-henry-sepia.vercel.app/">
              <img
                src="https://res.cloudinary.com/hypermegared/image/upload/v1704231317/wsum710gbvcgjo2ktujm.jpg"
                style="
                  display: block;
                  max-width: 500px;
                  margin-top: 5px;
                "
              />
            </a>
          </td>
        </tr>
      </table>
      </div>
    `,
    })
    .then(() => userEmail);
};

const sendResetPasswordEmail = async (  
  adminEmail,
  userEmail,
  jwtToken,
  gateway
) => {
  const resetPasswordUrl = `${gateway}/change_password/${jwtToken}`;
  await transporter
    .sendMail({
      from: adminEmail,
      to: userEmail,
      subject: "Reseteo de password!",
      html: `
      <div
      style="
       background: linear-gradient(to top, #fd611a, white);
       width: 100%;
       max-width: 600px;
       filter: brightness(80%);
       height: auto;
       border-radius: 20px;
      "
      >
      <table
        style="
        width: 100%;
        max-width: 500px;
        height: auto;
        background: linear-gradient(to bottom, black, white);
        margin: 2px auto;
        border: solid 1px white;
        align-items: center;
        "
      >
        <tr>
          <td>
            <a href="https://pf-henry-sepia.vercel.app/">
            <img src="https://res.cloudinary.com/hypermegared/image/upload/v1704925814/jwnogqatk0b1jdmpfrzz.png" alt="logo" style="width: 100px;height: 100px; margin: 0 200px 0 200px ;">
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <p
              style="
                font-size: 10px;
                text-align: center;
                margin: 15px 50px 0 50px;
                color: white;
                font-weight: bold;
              "
            >
              Al hacer click en el siguiente boton sera redireccionado 
              al formulario donde podra ingresar su nueva contrasena
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p
              style="
                font-size: 1.2em;
                text-align: center;
                color: white;
                font-weight: bold;
              "
            >
              No vuelva a olvidar su contrasena, anotela en un cuaderno y tengalo cercaa
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <a href="${resetPasswordUrl}" >
              <button
                style="
                  align-items: center;
                  width: 200px;
                  height: 50px;
                  background-color: rgb(253, 97, 26);
                  color: white;
                  font-size: 1em;
                  font-weight: bold;
                  border-radius: 10px;
                  margin: 0 150px 0 150px;
                "
              >
                Reinicio de contrasena
              </button>
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <p
              style="
                font-size: 15px;
                text-align: center;
                color: black;
                font-weight: bolder;
                margin: 15px 50px 0px 50px;
                text-shadow: 0.5px 0px 0px rgb(255, 255, 255),
                  0px 0.5px 0px rgb(255, 255, 255), -0.5px 0px 0px rgb(255, 255, 255),
                  0px -0.5px 0px rgb(255, 255, 255);
              "
            >
              Si tienes algun problema con el boton de arriba, copia y pega el
              siguiente 
            </p>
          </td>
        </tr>
        <tr>
          <td style="text-align:start; margin: 0 150px 0 150px;max-width: 300px;">
            <b style="max-width: 300px; font-size: small; color: black;word-break: break-all;">${resetPasswordUrl}</b>
          </td>
        </tr>
        <tr>
          <td>
            <a href="https://pf-henry-sepia.vercel.app/">
              <img
                src="https://res.cloudinary.com/hypermegared/image/upload/v1704231317/wsum710gbvcgjo2ktujm.jpg"
                style="
                  display: block;
                  max-width: 500px;
                  margin-top: 5px;
                "
              />
            </a>
          </td>
        </tr>
      </table>
      </div>
    `,
    });
  return userEmail;
}

module.exports = { sendConfirmationEmail, sendResetPasswordEmail };
