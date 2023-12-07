require("dotenv").config();
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

const { DB_USER, DB_PASSWORD, DB_HOST, BDD } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${BDD}`,
 
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Puedes ajustar esto según tus necesidades de seguridad
      },
    },
    logging: false,
  }
);

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


User.belongsTo(UserRole, { foreignKey: 'rolId', as: 'role'});
UserRole.hasMany(User, { foreignKey: 'rolId', as: 'users' });

//RELACIONES PRODUCTS

Product.belongsToMany(ProductBrand, { through: "ProductProductBrand" });
ProductBrand.belongsToMany(Product, { through: "ProductProductBrand" });

Product.belongsToMany(ProductCategory, { through: "ProductProductCategory" });
ProductCategory.belongsToMany(Product, { through: "ProductProductCategory" });

Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);

Product.hasOne(ProductStock);
ProductStock.belongsTo(Product);

//RELACIONES SERVICE
Service.hasOne(Service_status);
Service.hasOne(User, {
  as: "Client",
  foreignKey: "userId",
  constraints: false,
  scope: {
    role_name: "client",
  },
});
Service.hasOne(User, {
  as: "Technician",
  foreignKey: "technicianId",
  constraints: false,
  scope: {
    role_name: "technician",
  },
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
