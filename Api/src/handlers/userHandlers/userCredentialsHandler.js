const {
    editUserCredentials,
    getUserCredentials,
  } = require("../../controllers/userControllers/userCredentialsController");
  

const getUserCredentialsHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await getUserCredentials(id);
      if (response.error) return res.status(404).json(response.response);
      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
  const editUserCredentialsHandler = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
      const response = await editUserCredentials(id, username, password);
      if (response.error) return res.status(404).json(response.response);
      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  module.exports = {
    getUserCredentialsHandler,
    editUserCredentialsHandler,
  };
  