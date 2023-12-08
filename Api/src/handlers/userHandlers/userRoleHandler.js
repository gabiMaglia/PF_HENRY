const {
  getUsersByRole,
  getAllRoles,
  ceateRole,
} = require("../../controllers/userControllers/userRolesController");

const getUsersByRoleHandler = async (req, res) => {
  const { role } = req.params;
  try {
    const response = await getUsersByRole(role);
    if (response.error) return res.status(404).json(response.response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getRolesHandler = async (req, res) => {
  try {
    const response = await getAllRoles();
    if (response.error) return res.status(404).json(response.response);
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

module.exports = {
  getUsersByRoleHandler,
  getRolesHandler,
  createRolesHandler,
};
