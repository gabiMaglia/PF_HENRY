require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";
const koyebDb = process.env.KOYEB_DB;
const localDb = process.env.LOCAL_DB;

const { Sequelize } = require("sequelize");
// Models import
const UserModel = require("./models/userModels/User");
const UserCredentialsModel = require("./models/userModels/UserCredentials");
const UserSessionModel = require("./models/Session");
const UserRoleModel = require("./models/userModels/UserRole");
const UserAddressModel = require("./models/userModels/UserAddress");
const ServiceStatusModel = require("./models/ServiceModels/Service_status");
const ServiceModel = require("./models/ServiceModels/Service");
const ServiceImageModel = require("./models/ServiceModels/Service_image");
const ProductModel = require("./models/productModels/Product");
const ProductBrandModel = require("./models/productModels/ProductBrand");
const ProductStockModel = require("./models/productModels/ProductStock");
const ProductCategoryModel = require("./models/productModels/ProductCategory");
const ProductImageModel = require("./models/productModels/ProductImage");
const WishListModel = require("./models/productModels/WishList");
const CartModel = require("./models/productModels/Cart");
const OrderModel = require("./models/productModels/Order");
const ProductCartModel = require("./models/productModels/ProductCart");

// Inicializacion de la instancia de sequelize
const OrderProductModel = require("./models/productModels/OrderProduct");

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
UserSessionModel(sequelize);
UserRoleModel(sequelize);
UserAddressModel(sequelize);
ServiceStatusModel(sequelize);
ServiceImageModel(sequelize);
ServiceModel(sequelize);
WishListModel(sequelize);

// INICIALIZAMOS LOS MODELOS PRODUCT
ProductModel(sequelize);
ProductBrandModel(sequelize);
ProductStockModel(sequelize);
ProductCategoryModel(sequelize);
ProductImageModel(sequelize);
CartModel(sequelize);
OrderModel(sequelize);
ProductCartModel(sequelize);
OrderProductModel(sequelize);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  UserRole,
  Session,
  UserAddress,
  UserCredentials,
  Product,
  ProductBrand,
  ProductStock,
  ProductCategory,
  ProductImage,
  Service,
  Service_status,
  Service_image,
  WishList,
  Cart,
  Order,
  ProductCart,
  OrderProduct,
} = sequelize.models;

// Creacion del session store encargado de guardar en la base de datos las sesiones

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

Product.hasMany(ProductImage, { onDelete: "CASCADE" });
ProductImage.belongsTo(Product);

Product.hasOne(ProductStock, {
  onDelete: "CASCADE",
});
ProductStock.belongsTo(Product);

//WISH LIST
User.hasOne(WishList);
WishList.belongsTo(User);

WishList.belongsToMany(Product, { through: "WishlistProduct" });
Product.belongsToMany(WishList, { through: "WishlistProduct" });

//CART
Cart.belongsTo(User);
User.hasOne(Cart);

Cart.belongsToMany(Product, {
  through: "ProductCart",
  // onDelete: "CASCADE",
});

Product.belongsToMany(Cart, {
  through: "ProductCart",
  // onDelete: "CASCADE",
});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: "OrderProduct" });
Product.belongsToMany(Order, { through: "OrderProduct" });
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

Service.hasMany(Service_image, { onDelete: "CASCADE" });
Service_image.belongsTo(Service);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
