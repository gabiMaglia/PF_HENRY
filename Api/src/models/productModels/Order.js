const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define("Order", {
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
      allowNull: true,
    },
    preferenceId: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
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

    // products: {
    //   type: DataTypes.JSONB,
    //   allowNull: false,
    // },

  });

  // Define el hook después de la actualización
  Order.addHook("afterUpdate", "updateEstado", async (order, options) => {
    if (order.changed("paymentId") && order.paymentId !== null) {
      order.state = "finalizado";
      await order.save();
    }
  });

  return Order;
};
