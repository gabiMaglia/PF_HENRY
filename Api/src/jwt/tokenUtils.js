const { BlackListedTokens } = require("../db");
const extractJwtToken = (inputString) => {
  const jwt = inputString.split(" ").pop();
  return jwt;
};
const checkBlacklistedToken = async (token) => {
  const blackListedTokens = await BlackListedTokens.findAll();
  const sortedBlackListedTokens = blackListedTokens.map((e) => e.token);
  const isBlackListed = sortedBlackListedTokens.includes(token);
  return isBlackListed
};

module.exports = {
  checkBlacklistedToken,
  extractJwtToken,
};
