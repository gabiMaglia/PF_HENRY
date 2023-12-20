const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cartTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippingDetails: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customerNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    products: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  });
};
