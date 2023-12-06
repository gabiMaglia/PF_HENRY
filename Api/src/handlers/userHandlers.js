const {
  getAllUsers,
  getAllRoles,
  getUserById,
  ceateRole,
  postUser,
  editUserById,
  deleteUserById,
} = require("../controllers/userController");

const getUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsers();
    if (response.error)
      return res.status(404).json(response.response);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getRolesHandler = async (req, res) => {
  try {
    const response = await getAllRoles();
    if (response.error)
      return res.status(404).json(response.response);
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
const createRolesHandler = async (req, res) => {
  const { role_name } = req.body;
  if (!role_name)
    return res.status(400).json({ error: "Missing required data..." });
  try {
    const response = await ceateRole(role_name);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editUserHandler = async (req, res) => {
  const {
    name,
    surname,
    birthdate,
    dni,
    email,
    telephone,
    image,
    userAddress,
    roles,
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
      roles,
      userCredentials
    );
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const editUserAddressHandler = async (req, res) => {
  const { userAddress } = req.body;
  const { id } = req.params;
  try {
    const response = await editUserById(id, userAddress);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const editUserCredentialsHandler = async (req, res) => {
  const { userCredentials } = req.body;
  const { id } = req.params;
  try {
    const response = await editUserById(id, userCredentials);
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
  getRolesHandler,
  getUserByIdHandler,
  postUserHandler,
  createRolesHandler,
  editUserHandler,
  editUserAddressHandler,
  editUserCredentialsHandler,
  deleteUserHandler,
};
