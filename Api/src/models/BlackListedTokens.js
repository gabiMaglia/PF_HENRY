const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('BlackListedTokens', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING(50000),
    },
  });
}