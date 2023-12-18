// En un archivo como CartProduct.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ProductCart", {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });
};
