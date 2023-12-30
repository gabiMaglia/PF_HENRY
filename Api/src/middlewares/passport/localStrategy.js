const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { User, UserCredentials } = require("../../db");

const verifyCallback = async (username, password, done) => {
  const userCredential = await UserCredentials.findOne({
    where: { username: username },
  });
  const passwordCorrect =
    userCredential === null
      ? false
      : await bcrypt.compare(password, userCredential.password);

  if (!userCredential) {
    return done(
      {
        error: true,
        response: "Credenciales incorrectas",
      },
      false
    );
  }
  if (!passwordCorrect) {
    return done(
      {
        error: true,
        response: "Credenciales incorrectas",
      },
      false
    );
  } else {
    const user = await User.findByPk(userCredential.UserId);
    return done(null, user);
  }
};

const localStrategy = new LocalStrategy(verifyCallback);

module.exports = localStrategy;
