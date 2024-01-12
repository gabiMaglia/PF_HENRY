const { User, History } = require("../../db.js");

const PostHistoryController = async (UserId, value) => {
  if (!value) {
    return {
      error: true,
      response: "no fue posible extraer los datos",
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
    return {
      error: true,
      response: "ya existe un historial con este valor para este usuario",
    };
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

module.exports = { PostHistoryController };
