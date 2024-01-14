const {
  getPrecioEnvios,
} = require("../../controllers/googleControllers/googlePlacesControllers");

const getPrecioEnviosHandler = async (req, res) => {
  try {
    const { destination } = req.query;
    const response = await getPrecioEnvios(destination);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPrecioEnviosHandler };
