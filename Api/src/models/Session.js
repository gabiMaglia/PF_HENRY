const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {sequelize.define('Session', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: {
      type: DataTypes.DATE,
    },
    data: {
      type: DataTypes.STRING(50000)
    },
  });
}