const { supportMailController } = require("./../controllers/mailingController");
require("dotenv").config();

const supportMailHandler = async (req, res) => {
  try {
    const destinationEmail = process.env.EMAIL_MAILER;
    console.log(destinationEmail)
    const { name, phone, email, content } = req.body;
    console.log(req.body);
    const response = await supportMailController(name, phone, email, content, destinationEmail);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { supportMailHandler };
