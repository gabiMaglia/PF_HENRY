// const transporter = require("../config/mailer");
// const jwt = require('jsonwebtoken')

// const sendConfirmationEmail = async (adminEmail, userEmail, userID, token, gateway) => {
//     let jwtToken = jwt.sign({userID}, token)
//     const confirmationUrl = `${gateway}/account/confirm/${jwtToken}`
//     return transporter.sendMail({
//         from: adminEmail,
//         to: userEmail,
//         subject: 'Confirm your account to log in!',
//         html :`<p>Please confirm your email <a href="${confirmationUrl}">Confirm</a></p>
//                <p> If you are having any troubles whit the link click here
//                <b>${confirmationUrl}</b> </p>`

//     }).then(()=> userEmail)

// }

// module.exports = {sendConfirmationEmail}
