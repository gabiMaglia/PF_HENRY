const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Cart", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM("inicializado", "comprado"),
    },
    cartTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });
};
