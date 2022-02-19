require('dotenv').config()
const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
const githubStrategy = require('passport-github').Strategy
const User = require('../models/user')

passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
     done(err, user);
   });
 });
passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
    }, (token, refreshToken, profile, done) => {
        // return done(null, profile
      //   console.log(profile)
        User.findOne({id: profile.id}).then((currentUser) => {
            if (currentUser) {
               done(null, currentUser)
            } else {
               new User({
                  id: profile.id,
                  username: profile.displayName,
                  picture: profile.photos[0].value
               })
               .save()
               .then( (user) => {
                  done(null, user)
               })
             
            }
         })
            
    }
))

passport.use(new githubStrategy({
    clientID: process.env.CLIENT_ID_GIT,
    clientSecret: process.env.CLIENT_SECRET_GIT,
    callbackURL: process.env.CALLBACK_URL_GIT
  },(token, refreshToken, profile, done) => {
   User.findOne({id: profile.id}).then((currentUser) => {
         // console.log(profile)
        if (currentUser) {
           done(null, currentUser)
        } else {
           new User({
              id: profile.id,
              username: profile.displayName,
              picture: "avatar.png"
           })
           .save()
           .then( (user) => {
              done(null, user)
           })
          
        }
     })
  }
))
