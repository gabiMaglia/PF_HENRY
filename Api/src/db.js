require("dotenv").config();
const { Sequelize } = require("sequelize");

const UserModel = require("./models/userModels/User");
const UserCredentialsModel = require("./models/userModels/UserCredentials");
const UserRoleModel = require("./models/userModels/UserRole");
const UserAddressModel = require("./models/userModels/UserAddress");
const ServiceStatusModel = require("./models/ServiceModels/Service_status");
const ProductModel = require("./models/productModels/Product");
const ProductBrandModel = require("./models/productModels/ProductBrand");
const ProductStockModel = require("./models/productModels/ProductStock");
const ProductCategoryModel = require("./models/productModels/ProductCategory");
const ProductImgModel = require("./models/productModels/ProductImg");

const { DB_USER, DB_PASSWORD, DB_HOST, BDD } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${BDD}`,
  {
    logging: true,
    native: false,
  }
);

// INICIALIZAMOS LOS MODELOS USER
UserModel(sequelize);
UserCredentialsModel(sequelize);
UserRoleModel(sequelize);
UserAddressModel(sequelize);
ServiceStatusModel(sequelize);

// INICIALIZAMOS LOS MODELOS PRODUCT
ProductModel(sequelize);
ProductBrandModel(sequelize);
ProductStockModel(sequelize);
ProductCategoryModel(sequelize);
ProductImgModel(sequelize);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  UserRole,
  UserAddress,
  UserCredentials,
  Product,
  ProductBrand,
  ProductStock,
  ProductCategory,
  ProductImg,
} = sequelize.models;

// RELACIONES USER

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

//RELACIONES PRODUCTS

Product.belongsTo(ProductBrand);
ProductBrand.hasMany(Product);

Product.belongsToMany(ProductCategory);
ProductCategory.belongsToMany(Product);

Product.hasMany(ProductImg);
ProductImg.belongsTo(Product);

Product.hasOne(ProductStock);
ProductStock.belongsTo(Product);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
