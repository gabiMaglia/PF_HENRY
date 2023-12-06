const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("UserRole", {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.ENUM,
      values: ['admin', 'technician', 'customer'],
      allowNull: false,
    },
  });


  
};