const { where } = require("sequelize");
const { User, History } = require("../../db.js");

const PostHistoryController = async (UserId, value) => {
  if (!value) {
    return {
      error: true,
      response: "no fue posible extraer los datos",
    };
  }else if((value.trim() !== "")===false){
    console.log(value.trim()!=='')
    return {
      error: true,
      response: "no es posible ingresar ese valor.",
    };
  }
  const user = await User.findByPk(UserId);
  if(!user){
    return {
      error: true,
      response: "el usuario no existe",
    };
  }
  const existingHistory = await History.findOne({
    where: {
      value: value,
      UserId: UserId
    }
  });
  if (existingHistory) {
    if(existingHistory.isDelete===true){
      existingHistory.isDelete=false
      await existingHistory.save()
    }
    return existingHistory
  }
  const newHistory = await History.create({
    value: value,
    UserId: UserId
  });
  if (!newHistory) {
    return {
      error: true,
      response: "no fue posible crear el historial",
    };
  }
  return newHistory;
};

const getHistoryUserController=async(id)=>{
  console.log(id)
  const user=await User.findByPk(id)
  if(!user){
    return {
      error: true,
      response: "el usuario no existe.",
    };
  }
  const historyUser=await History.findAll({
    where:{UserId:id}
  })
    if(!historyUser||historyUser.length===0){
      return('el usuario aun no posee historial.')
    }
    return historyUser
}

const deleteHistoryController=async(id,value)=>{
  const userHistory=await getHistoryUserController(id)
  if(userHistory.error){
    return {
      error: true,
      response: "algo salio mal.",
    }
  }
  const historyValue= await History.findOne({
    where:{
      UserId:id,
      value:value
    }
  })
  historyValue.isDelete=true
  await historyValue.save()
   const response=await History.findAll({
    where:{UserId:id}
   })
   return response
}

module.exports = { PostHistoryController,getHistoryUserController,deleteHistoryController };
