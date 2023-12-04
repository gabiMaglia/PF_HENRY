
const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('User', {
       id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          surname: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          birthdate: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          dni: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            isEmail: true,
          },
          telephone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true, 
          },
          image: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true, 
          }
    }) 
}