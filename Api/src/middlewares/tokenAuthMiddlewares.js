const { verifyToken } = require("../jwt/tokenGenerator.js");

function extractJwtToken(inputString) {
  const regex = /jwt=([^;]+)/;
  const match = inputString.match(regex);
  return match ? match[1] : null;
}

// MIDDLEWARE QUE CHEKEA TOKEN
const checkAuthToken = async (req, res, next) => {
  try {
    const token = extractJwtToken(req.headers.cookie);
    const tokenData = await verifyToken(token);
    if (!tokenData?.userId) {
      res.status(409);
      res.send({ error: "No tienes acceso a esta ruta" });
    } else {
      next();
    }
  } catch (error) {
    res.status(409);
    res.send({ error: "No tienes acceso a esta ruta" });
  }
};

// MIDDLEWARE QUE CHEKEA ROL
const checkRoleAuthToken = (role) => async (req, res, next) => {
  try {
    const token = req.header?.cookie
    ? extractJwtToken(req.headers.cookie)
    : extractJwtToken(req.headers.Authorization)
    const tokenData = await verifyToken(token);

    if (![].concat(role).includes(tokenData.userRole)) {
      res.status(409);
      res.send({ error: "No tienes acceso a esta ruta" });
    } else {
      next();
    }
  } catch (error) {
    res.status(409);
    res.send({ error: "No tienes acceso a esta ruta" });
  }
};

module.exports = {
  checkAuthToken,
  checkRoleAuthToken,
};
