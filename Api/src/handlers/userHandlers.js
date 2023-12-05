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
        .send("There are no users yet");
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getUserById(id);
    if (!response) return res.status(404).send("User not found");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const postUserHandler = async (req, res) => {
  const { name, surname, birthdate, dni, email, telephone, image, userCredentials, userAddress, roles } = req.body
  try {


    if (
      !name ||
      !surname ||
      !birthdate ||
      !dni ||
      !email ||
      !telephone ||
      !userCredentials
    ) {
      return res.status(400).json({ error: "Missing required data..." });
    }
    const response = await postUser(name, surname, birthdate, dni, email, telephone, image, userAddress, roles);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editUserHandler = async (req, res) => {
  const { name, surname, birthdate, dni, email, telephone, image, userAddress, roles, userCredentials } = req.body
  const { id } = req.params;
  try {
    const response = await editUserById(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const editUserAddressHandler = async (req, res) => {
  const { userAddress} = req.body
  const { id } = req.params;
  try {
    const response = await editUserById(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const editUserCredemtialsHandler = async (req, res) => {
  const { userCredentials } = req.body
  const { id } = req.params;
  try {
    const response = await editUserById(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
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
  editUserAddressHandler,
  editUserCredemtialsHandler,
  deleteUserHandler,
};
