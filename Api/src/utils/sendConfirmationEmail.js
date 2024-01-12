const transporter = require("../config/mailer");
const jwt = require("jsonwebtoken");

const sendConfirmationEmail = async (
  adminEmail,
  userEmail,
  userID,
  token,
  gateway
) => {
  let jwtToken = jwt.sign({ userID }, token);
  const confirmationUrl = `${gateway}/account/confirm/${jwtToken}`;

  return transporter
    .sendMail({
      from: adminEmail,
      to: userEmail,
      subject: "Confirm your account to log in!",
      html: `
      <div style="
      background-color:#fd611a;
        width:800px; height:800px;
        filter: brightness(85%);">
         <div style=" width:500px; height:800px; background: linear-gradient(to bottom, black, white);
         margin:0 150px  0 150px;">
             <p style="
        font-size: 1.2em; 
        text-align: center;
        padding:100px 0 0 0;
        color:white;
        font-weight:bold;">Por favor confirme su email</p>
             <br>
             <div style="
        align-items: center; >
        <a href="${confirmationUrl}=""">
                 <button style="width: 200px; height: 50px; background-color: rgb(253, 97, 26); color: white; font-size: 1em; font-weight: bold; border-radius: 10px; cursor: pointer;" onmouseover="this.style.backgroundColor='white'; this.style.color='#fd611a';" onmouseout="this.style.backgroundColor='#fd611a'; this.style.color='white';">
                     Confirmar Email
                 </button>
            </a>
             </div>
             <br>
             <a href="https://pf-henry-sepia.vercel.app/&quot;">
                 <img src="https://res.cloudinary.com/hypermegared/image/upload/v1704231317/wsum710gbvcgjo2ktujm.jpg" style=" margin-bottom: 20px; display: block; max-width:500px">
             </a>
             <br>
             <p style="font-size: 1em; text-align: center; color:black">Si tienes algun problema con el enlace de arriba, copia y pega el siguiente <b>${confirmationUrl}</b> </p>
         </div>
     </div>
    `,
    })
    .then(() => userEmail);
};

module.exports = { sendConfirmationEmail };
