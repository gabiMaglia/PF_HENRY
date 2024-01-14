const { verifyToken } = require("../jwt/tokenGenerator.js");

function extractJwtToken(inputString) {
  const jwt = inputString.split(" ").pop();
  return jwt;
}

// MIDDLEWARE QUE CHEKEA TOKEN
const checkAuthToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(409).send({ error: "inicie sesion para continuar" });
    const token = extractJwtToken(req.headers.authorization);
    // chekamos que sea valido
    const tokenData = await verifyToken(token);
    if (!tokenData?.userId) {
      res.status(409);
      res.send({ error: "No tienes acceso a esta ruta" });
    } else {
      // si esta activo y es valido
      next();
    }
  } catch (error) {
    res.status(500);
    res.send({ error: "Error del servidor" });
  }
};

// MIDDLEWARE QUE CHEKEA ROL
const checkRoleAuthToken = (role) => async (req, res, next) => {
  try {
    const token = extractJwtToken(req.headers.authorization);
    const tokenData = await verifyToken(token);
    if (![].concat(role).includes(tokenData.userRole)) {
      res.status(409);
      res.send({ error: "No tienes acceso a esta ruta (rol incorrecto)" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500);
    res.send({ error: "Error del servidor" });
  }
};

module.exports = {
  checkAuthToken,
  checkRoleAuthToken,
};
