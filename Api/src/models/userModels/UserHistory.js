const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define(
        "History",{
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
              },
              value:{
                type:DataTypes.STRING,
                allowNull:false
              },
              isDelete:{
                type:DataTypes.BOOLEAN,
                allowNull:true,
                defaultValue:false
              }
        },{
            timestamps: false,
          }
    )
}