const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Service", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    communication_preference: {
      type: DataTypes.STRING,
      defaultValue: "Pendiente",
      validate: {
        isIn: ["Pendiente", "true", "false"],
      },
    },
    product_model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_income_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
};
