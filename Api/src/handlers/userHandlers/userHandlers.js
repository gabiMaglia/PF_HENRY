const {
  getAllUsers,
  getUserById,
  postUser,
  editUserById,
} = require("../../controllers/userControllers/userController");

const getUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsers();
    if (response.error) return res.status(404).json(response.response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getUserById(id);
    if (response.error) return res.status(404).json(response.response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const postUserHandler = async (req, res) => {
  const {
    name,
    surname,
    birthdate,
    dni,
    email,
    telephone,
    image,
    userCredentials,
    userAddress,
    role = "custommer",
  } = req.body;
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
    const response = await postUser(
      name,
      surname,
      birthdate,
      dni,
      email,
      telephone,
      image,
      userCredentials,
      userAddress,
      role
    );
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editUserByIdHandler = async (req, res) => {
  const {
    name,
    surname,
    birthdate,
    dni,
    email,
    telephone,
    image,
    userAddress,
    role,
    userCredentials,
  } = req.body;
  const { id } = req.params;

  try {
    const response = await editUserById(
      id,
      name,
      surname,
      birthdate,
      dni,
      email,
      telephone,
      image,
      userAddress,
      role,
      userCredentials
    );
    if (response.error) return res.status(404).json(response.response);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getUsersHandler,
  getUserByIdHandler,
  postUserHandler,
  editUserByIdHandler,
};
