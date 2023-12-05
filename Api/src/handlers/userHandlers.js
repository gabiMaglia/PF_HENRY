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
    if (response.length === 0)
      return res
        .status(404)
        .send("No hay usuarios registrados en la base de datos");
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getUserById(id);
    if (!response) return res.status(404).send("Usuario no encontrado");
    return res.status(200).json(response);
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
