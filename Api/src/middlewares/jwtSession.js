const { verifyToken } = require("../jwt/tokenGenerator");
const { User } = require("../db");

const sessionFlag = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    verifyToken(token.split(" ").pop()).then((data) => {
      User.findByPk(data.userId).then((user) => {
        const fechaActual = new Date();
        const formatoCompleto = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}-${fechaActual.getDate().toString().padStart(2, '0')} ${fechaActual.getHours().toString().padStart(2, '0')}:${fechaActual.getMinutes().toString().padStart(2, '0')}`;
        const conectionData = {
            Usuario: `${user.name} ${user.surname}`,
            Rol: data.userRole,
            Conexion: formatoCompleto
          }
        console.log(conectionData);
      });
    });
  }
  next();
};

module.exports = {
  sessionFlag,
};
