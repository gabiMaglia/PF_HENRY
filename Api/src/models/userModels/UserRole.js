const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("UserRole", {
    role_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.ENUM,
      values: ['admin', 'technician', 'custommer'],
      allowNull: false,
    },
  });
};