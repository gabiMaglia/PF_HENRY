const { User } = require("../db");
const { BlackListedTokens } = require("../db");
const dateFormater = require("../utils/dateFormater");
const extractJwtToken = (inputString) => {
  const jwt = inputString.split(" ").pop();
  return jwt;
};
const checkBlacklistedToken = async (token) => {
  const blackListedTokens = await BlackListedTokens.findAll();
  const sortedBlackListedTokens = blackListedTokens.map((e) => e.token);
  const isBlackListed = sortedBlackListedTokens.includes(token);
  return isBlackListed;
};
const sessionFlag = async (tokenData) => {
  const data = await User.findByPk(tokenData.userId);
  const fechaActual = new Date();
  const formatoCompleto = dateFormater(fechaActual);
  const conectionData = {
    Usuario: `${data.name} ${data.surname}`,
    Rol: tokenData.userRole,
    Conexion: formatoCompleto,
  };

  return conectionData;
};
const tokenRemainingTime = async (tokenData) => {
  const remainingTime = tokenData.exp - Math.floor(Date.now() / 1000);
  const hour = Math.floor((remainingTime % 86400) / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  return {time: remainingTime, message :`Te quedaan ${hour} horas, ${minutes} minutos y ${seconds} segundos `};
};

module.exports = {
  checkBlacklistedToken,
  extractJwtToken,
  sessionFlag,
  tokenRemainingTime,
};
