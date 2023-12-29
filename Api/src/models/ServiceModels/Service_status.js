const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Service_status", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    technical_diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    final_diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.STRING,
      defaultValue: "pendiente",
    },
    confirm_repair: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    repair_finish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
