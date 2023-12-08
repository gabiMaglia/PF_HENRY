const { User, UserRole } = require("../../db.js");
const getUsersByRole = async (role) => {
    const data = await UserRole.findOne({
      where: { role_name: role },
    });
    
    if (!data)
      return { error: true, response: `There are no users whit the ${role} role` }
    ;
    const users = await User.findAll({
      where: { rolId: data.dataValues.id },
    });
  
    return users;
  };
  const getAllRoles = async () => {
    const roles = await UserRole.findAll();
    if (roles.length === 0) {
      return {
        error: true,
        response: `Users not found`,
      };
    }
    return roles;
  };

  const ceateRole = async (role_name) => {
    const role = await UserRole.findOrCreate({
      where: { role_name },
      defaults: { role_name },
    });
    return role[0];
  };

  module.exports = {
    getUsersByRole,
    getAllRoles,
    ceateRole,
  };