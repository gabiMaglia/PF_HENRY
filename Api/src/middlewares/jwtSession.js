const { verifyToken } = require("../jwt/tokenGenerator");

const { User } = require("../db");
const dateFormater = require("../utils/dateFormater");

const sessionFlag = (req, res, next) => {
  // try {
  // } catch {
  //   const token = req.headers.authorization;
  //   const decodedToken = verifyToken(token.split(" ").pop());
  //   if (decodedToken) {
  //     User.findByPk(decodedToken.userId).then((user) => {
  //       const fechaActual = new Date();
  //       const formatoCompleto = dateFormater(fechaActual);
  //       const conectionData = {
  //         Usuario: `${user.name} ${user.surname}`,
  //         Rol: decodedToken.userRole,
  //         Conexion: formatoCompleto,
  //       };
  //       // console.log(conectionData);
  //     });
  //   }
  // }

  next();
};

const tokenRemainingTime = (req, res, next) => {
  // try {
  //   const token = req.headers.authorization;
  //   const decodedTOken = verifyToken(token.split(" ").pop());
  //   if (decodedTOken?.exp) {
  //     const remainingTime = decodedTOken.exp - Math.floor(Date.now() / 1000);
  //     const hour = Math.floor((remainingTime % 86400) / 3600);
  //     const minutes = Math.floor((remainingTime % 3600) / 60);
  //     const seconds = remainingTime % 60;
  //     console.log(
  //       `Te quedaan ${hour} horas, ${minutes} minutos y ${seconds} segundos `
  //     );
  //   }
  // } catch (error) {
  //   console.log('llego')
  //   console.log(error)
  // }
  next();
};
module.exports = {
  sessionFlag,
  tokenRemainingTime,
};
