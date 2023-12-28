const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Service_image",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
