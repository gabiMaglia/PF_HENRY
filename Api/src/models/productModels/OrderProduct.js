const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("OrderProduct", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
