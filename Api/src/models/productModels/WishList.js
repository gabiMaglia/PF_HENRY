const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("WishList", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  });
};
