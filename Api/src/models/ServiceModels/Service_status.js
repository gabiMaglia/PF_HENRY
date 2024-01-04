const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Service_status", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    technical_diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    final_diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.STRING,
      defaultValue: "Pendiente",
    },
    confirm_repair: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Local esperando llegada",
      validate: {
        isIn: [
          [
            "Local esperando llegada",
            "Recibido en el local",
            "En proceso de diagnostico",
            "Esperando confirmación del cliente",
            "Reparación en curso",
            "Pruebas finales",
            "Reparación finalizada",
            "Listo para retirar",
            "Servicio finalizado",
            "Servicio cancelado",
          ],
        ],
      },
    },
  });
};
