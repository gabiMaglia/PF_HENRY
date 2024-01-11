const { User, History } = require("../../db.js");

const PostHistoryController = async (UserId, value) => {
    if(!UserId||!value){
        return {
            error: true,
            response: "no fue posible extraer los datos",
          };
    }
  const [newHistory] = await History.findOrCreate({
    value,
    UserId,
  });
  if(!newHistory){
    return {
        error: true,
        response: "no fue posible crear el historial",
      };
  }
  return newHistory
};
