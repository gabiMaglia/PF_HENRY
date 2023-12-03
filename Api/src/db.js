require("dotenv").config();
const { Sequelize } = require("sequelize");

const UserModel = require('./models/userModels/User')
const UserCredentialsModel = require('./models/userModels/UserCredentials')
const UserRoleModel = require('./models/userModels/UserRole')
const UserAddressModel = require('./models/userModels/UserAddress')


const { DB_USER, DB_PASSWORD, DB_HOST, BDD } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${BDD}`,
  {
    logging: true,
    native: false,
  }
);

// INICIALISAMOS LOS MODELOS
UserModel(sequelize)
UserCredentialsModel(sequelize)
UserRoleModel(sequelize)
UserAddressModel(sequelize)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  UserRole,
  UserAddress,
  UserCredentials
  
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



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
