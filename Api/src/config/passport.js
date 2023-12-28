const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User, UserCredentials } = require("../db");

const verifyCallback = async (username, password, done) => {
  let userCredential;
  let passwordCorrect;

  if (password) {
    userCredential = await UserCredentials.findOne({
      where: { username: username },
    });
    passwordCorrect =
      userCredential === null
        ? false
        : await bcrypt.compare(password, userCrential.password);
  }

  if (!userCredential) {
    return done(
      {
        error: true,
        response: "Credenciales incorrectas",
      },
      false
    );
  }
  if (passwordCorrect) {
    const user = await User.findByPk(userCredential.UserId);

    if (!_user.isActive) {
      return done(
        {
          error: true,
          response:
            "El usuario no se encuentra activo, verifique su casilla de correo para verificar su direccion de email",
        },
        false
      );
    }
    return done(null, user);
  } else {
    return done(
      {
        error: true,
        response: "Credenciales incorrectas",
      },
      false
    );
  }
};
const strategy = new LocalStrategy();

passport.use(
  new LocalStrategy((username, password, cb) => {
    // .then((user) => {
    //     if (!user) {return cb(null, false)}
    //     const isValid = validPassword(password, user.hash, user.salt)
    // })
  })
);
