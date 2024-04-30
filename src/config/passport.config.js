const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../services/user.services");
const GoogleUser = require("../services/googleUser.services");
const { validatePassword } = require("../utils/password.utils");
const initializeDotenv = require("../config/dotenv.config");

initializeDotenv();

passport.serializeUser((user, done) => {
  // console.log(user);
  done(null, { id: user.id, strategy: user.strategy });
});

passport.deserializeUser(async (serializedData, done) => {
  try {
    switch (serializedData.strategy) {
      // local login case
      case "local":
        const user = await User.findUserByID(serializedData.id);
        // console.log(user);
        if (user) {
          return done(null, user);
        } else {
          throw new Error("User not found");
        }
      // oauth for google login
      case "google":
        const googleUser = await GoogleUser.findGoogleUserByID(
          serializedData.id
        );
        console.log(googleUser);

        if (googleUser) {
          return done(null, googleUser);
        } else {
          throw new Error("User not found");
        }
      //no strategy was specified
      default:
        throw new Error("strategy not supported");
    }
  } catch (err) {
    return done(err, null);
  }
});

//----- Passport strategy for local user (email, password) login -----//
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findUserByEmail(email);
        // Use this so I can pass the strategy type to make serializing the user easier
        const strategyData = {
          id: user.id,
          email: user.email,
          password: user.password,
          strategy: "local",
        };
        //user is found
        if (user) {
          const isValid = await validatePassword(
            password,
            strategyData.password
          );

          if (isValid) {
            return done(null, strategyData, {
              message: "Authentication successful",
            });
          } else {
            return done(null, false, { message: "Password is not valid" });
          }
        } else {
          return done(null, false, { message: "User not found" });
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);

//----- Passport strategy for google oauth2 authentication -----//
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/v1/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        // console.log(profile);
        const oauthUser = await GoogleUser.findOrCreate(profile);
        // TEST WITH MYPHILIPP FOR CREATING A NEW USER
        console.log(oauthUser);
        const strategyData = {
          id: oauthUser.id,
          strategy: "google",
        };
        // console.log(strategyData);

        return cb(null, strategyData);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);
