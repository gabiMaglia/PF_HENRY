require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

const { Sequelize } = require("sequelize");

const UserModel = require("./models/userModels/User");
const UserCredentialsModel = require("./models/userModels/UserCredentials");
const UserRoleModel = require("./models/userModels/UserRole");
const UserAddressModel = require("./models/userModels/UserAddress");
const ServiceStatusModel = require("./models/ServiceModels/Service_status");
const ServiceModel = require("./models/ServiceModels/Service");
const ProductModel = require("./models/productModels/Product");
const ProductBrandModel = require("./models/productModels/ProductBrand");
const ProductStockModel = require("./models/productModels/ProductStock");
const ProductCategoryModel = require("./models/productModels/ProductCategory");
const ProductImageModel = require("./models/productModels/ProductImage");

const koyebDb = process.env.KOYEB_DB;
const localDb = process.env.LOCAL_DB;

const sequelize = new Sequelize(isProduction ? koyebDb : localDb, {
  dialect: "postgres",
  dialectOptions: {
    ssl: isProduction ? { require: true, rejectUnauthorized: false } : false,
  },
  logging: false,
});

// INICIALIZAMOS LOS MODELOS USER
UserModel(sequelize);
UserCredentialsModel(sequelize);
UserRoleModel(sequelize);
UserAddressModel(sequelize);
ServiceStatusModel(sequelize);
ServiceModel(sequelize);

// INICIALIZAMOS LOS MODELOS PRODUCT
ProductModel(sequelize);
ProductBrandModel(sequelize);
ProductStockModel(sequelize);
ProductCategoryModel(sequelize);
ProductImageModel(sequelize);

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
  ProductImage,
  Service,
  Service_status,
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

User.belongsTo(UserRole, { foreignKey: "rolId", as: "role" });

//RELACIONES PRODUCTS

Product.belongsToMany(ProductBrand, {
  through: "ProductProductBrand",
  onDelete: "CASCADE",
});
ProductBrand.belongsToMany(Product, { through: "ProductProductBrand" });

Product.belongsToMany(ProductCategory, { through: "ProductProductCategory" });
ProductCategory.belongsToMany(Product, { through: "ProductProductCategory" });

Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);

Product.hasOne(ProductStock, {
  onDelete: "CASCADE",
});
ProductStock.belongsTo(Product);

//RELACIONES SERVICE
Service.hasOne(Service_status);
Service.belongsTo(User, {
  as: "Client",
  foreignKey: "userId",
});
User.hasMany(Service, {
  as: "ClientServices",
  foreignKey: "userId",
});

Service.belongsTo(User, {
  as: "Technician",
  foreignKey: "technicianId",
});
User.hasMany(Service, {
  as: "TechnicianServices",
  foreignKey: "technicianId",
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
