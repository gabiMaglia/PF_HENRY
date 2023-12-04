const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Service", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    product_model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_income_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: { 
      type: DataTypes.UUID,
      allowNull: true,
    },
    technicianId: {
      type: DataTypes.UUID,
      allowNull: true,
    }})

}