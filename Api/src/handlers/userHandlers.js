const {
  getAllUsers,
  getUserById,
  postUser,
  editUserById,
  deleteUserById,
} = require("../controllers/userController");

const getUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsers();
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getUserById(id);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const postUserHandler = async (req, res) => {
  try {
    const response = await postUser(req.body);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const editUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await editUserById(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteUserById(id);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getUsersHandler,
  getUserByIdHandler,
  postUserHandler,
  editUserHandler,
  deleteUserHandler,
};
