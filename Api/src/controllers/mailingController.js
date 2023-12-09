const transporter = require('./../config/mailer')

const supportMailController = async (name, phone, userEmail, content) => {
    return transporter.sendMail({
        from: userEmail,
        to: 'gab.maglia@gmail.com',
        subject: `Consulta de soporte de ${name}` ,
        html :`<p>${content}</p>  <b>mi numero de telefono es ${phone}</b>`
              
    }).then(()=> userEmail)
}


module.exports = {supportMailController}