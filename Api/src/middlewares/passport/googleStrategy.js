require("dotenv").config();
const { User } = require("../../db");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const {
  registerUser,
} = require("../../controllers/accountControllers/authController");

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails.find((email) => email.verified === true);
  const { given_name, family_name, picture, sub } = profile._json;

  const response = await User.findOne({ where: { email: email.value } });

  // IF EXITS IN DATABASE
  if (response) {
   return done(null, profile._json);
 
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
    return done(null, profile);
  }
};

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL}/auth/google/callback`,
    scope: ["profile", "email"],
  },
  verifyCallback
);

module.exports = googleStrategy;
