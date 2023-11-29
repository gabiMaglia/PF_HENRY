require("dotenv").config();
const { Sequelize } = require("sequelize");




const { DB_USER, DB_PASSWORD, DB_HOST, BDD } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${BDD}`,
  {
    logging: true,
    native: false,
  }
);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
