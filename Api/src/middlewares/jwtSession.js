const { verifyToken } = require("../jwt/tokenGenerator");

const { User } = require("../db");
const dateFormater = require("../utils/dateFormater");

const sessionFlag = (req, res, next) => {

  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const decodedToken = verifyToken(token.split(" ").pop());
    if (decodedToken) {
      User.findByPk(decodedToken.userId).then((user) => {
        const fechaActual = new Date();
        const formatoCompleto = dateFormater(fechaActual)
        const conectionData = {
          Usuario: `${user.name} ${user.surname}`,
          Rol: decodedToken.userRole,
          Conexion: formatoCompleto,
        };
        console.log(conectionData);
      });
    }
  }
  next();
};

const tokenRemainingTime = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const decodedTOken = verifyToken(token.split(" ").pop());
    if (decodedTOken?.exp) {
      const remainingTime = decodedTOken.exp - Math.floor(Date.now() / 1000);
      const hour = Math.floor((remainingTime % 86400) / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);

      console.log(`Te quedaan ${hour} horas y ${minutes} minutos`);
    } else {
      console.log("tokenVencido");
    }
  }
  next();
};

module.exports = {
  sessionFlag,
  tokenRemainingTime,
};
