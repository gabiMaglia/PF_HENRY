const transporter = require("../config/mailer");
const jwt = require('jsonwebtoken')

const sendConfirmationEmail = async (adminEmail, userEmail, userID, token, gateway) => {
    let jwtToken = jwt.sign({userID}, token)
    const confirmationUrl = `http://${gateway}/account/confirm/${jwtToken}`
    
    return transporter.sendMail({
        from: adminEmail,
        to: userEmail,
        subject: 'Confirm your account to log in!',
        html :`
        <p>Por favor confirme su email <a href="${confirmationUrl}">Confirm</a></p>
        <p>Si tienes algun proble con el link de arriba, copia y pega el siguiente <b>${confirmationUrl}</b></p>
        `

    }).then(()=> userEmail)

}

module.exports = {sendConfirmationEmail}
