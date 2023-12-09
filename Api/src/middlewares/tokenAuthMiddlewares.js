const { verifyToken } = require("../jwt/tokenGenerator.js");

// MIDDLEWARE QUE CHEKEA TOKEN
const checkAuthToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    if (!tokenData?.userId) {
      res.status(409);
      res.send({ error: "Not authorized" });
    } else {
      next();
    }
  } catch (error) {
    res.status(409);
    res.send({ error: "Not authorized" });
  }
};

// MIDDLEWARE QUE CHEKEA ROL
const checkRoleAuthToken = (role) => async (req, res, next) => {
  try {
      const token = req.headers.authorization.split(" ").pop();
      const tokenData = await verifyToken(token);
    
    if (![].concat(role).includes(tokenData.userRole)) {
      res.status(409);
      res.send({ error: "Not authorized" });
    } else {
      next();
    }
  } catch (error) {
    res.status(409);
    res.send({ error: "Not authorized" });
  }
};

module.exports = {
  checkAuthToken,
  checkRoleAuthToken,
};
