const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users"); // Ensure the User model is properly imported and not reassigned later

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser); // Return here to prevent further code execution
      }

      // Create a new user if one doesn't exist
      const user = await new User({
        // Corrected: don't use `User` again; use `user` for the instance
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      }).save();

      done(null, user);
    }
  )
);
