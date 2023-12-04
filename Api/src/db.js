require("dotenv").config();
const { Sequelize } = require("sequelize");

const UserModel = require("./models/userModels/User");
const UserCredentialsModel = require("./models/userModels/UserCredentials");
const UserRoleModel = require("./models/userModels/UserRole");
const UserAddressModel = require("./models/userModels/UserAddress");
const ServiceStatusModel = require("./models/ServiceModels/Service_status");
const ServiceModel = require("./models/ServiceModels/Service");
const { DB_USER, DB_PASSWORD, DB_HOST, BDD } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${BDD}`,
  {
    logging: true,
    native: false,
  }
);

// INICIALISAMOS LOS MODELOS
UserModel(sequelize);
UserCredentialsModel(sequelize);
UserRoleModel(sequelize);
UserAddressModel(sequelize);
ServiceStatusModel(sequelize);
ServiceModel(sequelize);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  UserRole,
  UserAddress,
  UserCredentials,
  Service,
  Service_status,
} = sequelize.models;

// RELACIONES

User.hasOne(UserCredentials, {
  onDelete: "CASCADE",
});
UserCredentials.belongsTo(User);

User.hasOne(UserAddress, {
  onDelete: "CASCADE",
});
UserAddress.belongsTo(User);

User.belongsTo(UserRole);

UserRole.hasMany(User);
//service relations
Service.hasOne(User, {
  as: "Client",
  foreignKey: "userId",
  constraints: false,
  scope: {
    role_name: "client",
  },
  onDelete: "CASCADE",
});
Service.hasOne(Service_status, {
  onDelete: "CASCADE",
});
Service.hasOne(User, {
  as: "Technician",
  foreignKey: "technicianId",
  constraints: false,
  scope: {
    role_name: "technician",
  },
  onDelete: "CASCADE",
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
