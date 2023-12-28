const passport = require("passport");
const localStrategy = require("./../middlewares/passport/localStrategy");
const googleStrategy = require("../middlewares/passport/googleStrategy");
const { User } = require("../db");

passport.use(localStrategy);
passport.use(googleStrategy);

passport.serializeUser((user, done) => {
  done(null, user._json.email);
});

passport.deserializeUser(async (mail, done) => {
  const user = await User.findOne({ where: { email: mail } });
  done(null, user);
});
