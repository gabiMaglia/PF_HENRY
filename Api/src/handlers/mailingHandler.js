const { supportMailController } = require("./../controllers/mailingController");
require("dotenv").config();

const supportMailHandler = async (req, res) => {
  try {
    const destinationEmail = process.env.EMAIL_MAILER;
    const { name, phone, email, content } = req.body;
    const response = await supportMailController(
      name,
      phone,
      email,
      content,
      destinationEmail
    );
    if (response.success) {
      return res.status(200).send(response);
    } else {
      return res.status(500).json({ response: `Su mail no pudo ser enviado` });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { supportMailHandler };
