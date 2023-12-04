const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("img", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    adress: {
      type: DataTypes.STRING,
      //   allowNull: false,
    },
  });
};
