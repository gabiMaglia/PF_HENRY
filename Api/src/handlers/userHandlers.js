const {
  getAllUsers,
  getUsersByRole,
  getAllRoles,
  getUserById,
  ceateRole,
  postUser,
  editUserById,
  editUserCredentials,
  getUserCredentials,
  deleteUserById,
} = require("../controllers/userController");

const getUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsers();
    if (response.error)
      return res.status(404).json(response.response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUsersByRoleHandler = async (req, res) => {
  const { role } = req.params
  
  try {
    const response = await getUsersByRole(role)
    if (response.error)
    return res.status(404).json(response.response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
    
}

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
    if (response.error)
      return res.status(404).json(response.response);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getUserCredentialsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getUserCredentials(id);
    if (response.error)
    return res.status(404).json(response.response);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
const editUserCredentialsHandler = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const response = await editUserCredentials(id, username, password);
    if (response.error)
    return res.status(404).json(response.response);
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
  getUsersByRoleHandler,
  getRolesHandler,
  getUserByIdHandler,
  postUserHandler,
  createRolesHandler,
  editUserByIdHandler,
  getUserCredentialsHandler,
  editUserCredentialsHandler,
  deleteUserHandler,
};
