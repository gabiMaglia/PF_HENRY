const {supportMailController} = require('./../controllers/mailingController')

const supportMailHandler = async (req, res) => {
 try {
     const {name, phone, email, content} = req.body
     console.log(req.body)
    const response = await supportMailController(name, phone, email, content)
    return res.status(200).send(response);
 } catch (error) {
    return res.status(500).json(error.message);
 }
}
module.exports = { supportMailHandler }