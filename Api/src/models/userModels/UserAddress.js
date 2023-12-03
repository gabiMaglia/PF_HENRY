
const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('UserAddress', {
        address_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          country: {
            type: DataTypes.STRING,
          },
          state: {
            type: DataTypes.STRING,
          },
          city: {
            type: DataTypes.STRING,
          },
          street: {
            type: DataTypes.STRING,
          },
          number: {
            type: DataTypes.INTEGER,
          },
          zipCode: {
            type: DataTypes.INTEGER,
          },
    }) 
}