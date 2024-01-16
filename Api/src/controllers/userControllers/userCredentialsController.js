const { UserCredentials } = require("../../db.js");
const getUserCredentials = async (id) => {
    const _userCredentials = await UserCredentials.findOne({
      where: { UserId: id },
    });
    if (!_userCredentials) {
      return {
        error: true,
        response: `Wrong user id`,
      };
    }
    return _userCredentials;
  };
  const editUserCredentials = async (id, username, password) => {
    const _userCredentials = await UserCredentials.findOne({
      where: { UserId: id },
    });

    if (!_userCredentials) {
      return {
        error: true,
        response: `Wrong user id`,
      };
    }
    await _userCredentials.update({
      username,
      password: await bcrypt.hash(password, 8),
    });
  
    const updatedCredentials = await UserCredentials.findOne({
      where: { UserId: id },
    });
  
    return updatedCredentials;
  };
  const editUserPassword = async (id, password) => {
    const _userCredentials = await UserCredentials.findOne({
      where: { UserId: id },
    });
    console.log(password);
    console.log(_userCredentials);
    if (!_userCredentials) {
      return {
        error: true,
        response: `Wrong user id`,
      };
    }
    await _userCredentials.update({
      password: await bcrypt.hash(password, 8),
    });
  
    const updatedCredentials = await UserCredentials.findOne({
      where: { UserId: id },
    });
  
    return updatedCredentials;
  };

  module.exports = {
    getUserCredentials,
    editUserCredentials,
    editUserPassword
  };