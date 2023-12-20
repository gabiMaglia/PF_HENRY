require("dotenv").config();
const { User, userCredentials } = require("../db");

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
      callbackURL: "http://localhost:3001/auth/google/callback",
      scope: ["profile", "email"],
    },
     async (accessToken, refreshToken, profile, done) => {

      const email = profile.emails.find((email) => email.verified === true);
      const { given_name, family_name, picture, sub } = profile._json;
      
      const response = await User.findOne({ where: { email: email.value } })
      console.log(profile)
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
      ;
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
