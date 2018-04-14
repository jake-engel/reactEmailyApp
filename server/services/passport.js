const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); // Sets up a new cookie containing the user.id
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true // When we push to production then this will keep our auth stuff in https not http
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = await new User({ googleId: profile.id }).save();
      done(null, newUser); // the newUser is what's passed in user in the serializeUser fxn
    }
  )
);
