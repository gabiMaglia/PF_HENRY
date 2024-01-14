const {
  PostHistoryController,
  getHistoryUserController,
  deleteHistoryController,
} = require("../../controllers/userControllers/userHistoryController");

const PostHistory = async (req, res) => {
  const { value } = req.body;
  const { id } = req.params;

  try {
    const response = await PostHistoryController(id, value);
    if (response.error) {
      return res.status(404).json(response.response);
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getHistoryByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getHistoryUserController(id);
    if (data.error) {
      return res.status(404).json(data.response);
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteHistory = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    const data = await deleteHistoryController(id, value);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { PostHistory, getHistoryByUser, deleteHistory };
