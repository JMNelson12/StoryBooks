const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

module.exports = function(passport){
  passport.use(
    new googleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL:'/auth/google/callback',
      proxy: true // Needed for remote server
    }, (accessToken, refreshToken, profile, done) =>{
      console.log(accessToken);
      console.log(profile);
    })
  )
}