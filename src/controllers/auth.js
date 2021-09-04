const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { name, latitude, longitude, phone } = req.body;
        console.log(latitude);
        const user = await User.create({
          name,
          email,
          password,
          latitude,
          longitude,
          phone,
        });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        await User.findOne({ email }).then(function (user) {
          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          const validate = user.validPassword(password);

          if (!validate) {
            return done(null, false, { message: "Wrong Password" });
          }

          return done(null, user, { message: "Logged in Successfully" });
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;
