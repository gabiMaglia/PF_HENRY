const { verifyToken } = require("../jwt/tokenGenerator");
const { User } = require("../db");

const sessionFlag = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    verifyToken(token.split(" ").pop()).then((data) => {
      User.findByPk(data && data.userId).then((user) => {
        const fechaActual = new Date();
        const formatoCompleto = `${fechaActual.getFullYear()}-${(
          fechaActual.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${fechaActual
          .getDate()
          .toString()
          .padStart(2, "0")} ${fechaActual
          .getHours()
          .toString()
          .padStart(2, "0")}:${fechaActual
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;

        const conectionData = data && {
          Usuario: `${user.name} ${user.surname}`,
          Rol: data.userRole,
          Conexion: formatoCompleto,
        };
        console.log(conectionData);
      });
    });
  }
  next();
};

const refreshTokenCheck = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;

    verifyToken(token.split(" ").pop()).then((data) => {
      const remainingTime = data?.exp - Math.floor(Date.now() / 1000);

      const hour = Math.floor((remainingTime % 86400) / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);

      console.log(`Te quedaan ${hour} horas y ${minutes} minutos`);
    });
  }
  next();
};

module.exports = {
  sessionFlag,
  refreshTokenCheck,
};
