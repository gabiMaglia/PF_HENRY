const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Wishlist", {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true,
    },
  });
};

const { DataTypes } = require("sequelize");
