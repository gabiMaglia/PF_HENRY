require("dotenv").config();
const { User } = require("../db");

var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const {
  registerUser,
} = require("../controllers/accountControllers/authController");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/auth/google/callback`,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails.find((email) => email.verified === true);
      const { given_name, family_name, picture, sub } = profile._json;

      const response = await User.findOne({ where: { email: email.value } });

      // IF EXITS IN DATABASE
      if (response) {
        done(null, profile);
      } else {
        // SAVE IN DATABASE
        await registerUser({
          name: given_name,
          surname: family_name,
          birthdate: null,
          dni: null,
          email: email.value,
          telephone: null,
          image: picture,
          role: "customer",
          userAddress: {},
          userCredentials: {
            username: email.value,
            password: sub,
          },
        });
        done(null, profile);
      }
    }
  )
);

passport.serializeUser((user, done) => {
 
  done(null, user._json.email);
});

passport.deserializeUser( async (mail, done) => {

  const user = await User.findOne({ where: { email: mail } });
  done(null, user);
});
