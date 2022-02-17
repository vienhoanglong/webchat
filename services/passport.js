require('dotenv').config()
var passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
// const facebookStrategy = require('passport-facebook').Strategy
const githubStrategy = require('passport-github').Strategy
const accounts = require('../models/accounts')
passport.serializeUser((user, done) => {
    done(null, user._id);
 });
//lay du lieu user 
passport.deserializeUser((id, done) => {
    accounts.findById(id)
    .then((user) => {
        done(null, user);
    })
 })
passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
    }, (token, refreshToken, profile, done) => {
        // return done(null, profile
        accounts.findOne({id: profile.id}).then((currentUser) => {
            if (currentUser) {
               done(null, currentUser);
            } else {
               new accounts({
                  id: profile.id,
                  username: profile.displayName,
                  picture: "avatar.png"
               })
               .save()
               .then( (newUser) => {
                  done(null, newUser);
               });
            }
         })
            
    }
));
// passport.use(new facebookStrategy({
//     clientID: process.env.ClIEND_ID_FB,
//     clientSecret: process.env.ClIEND_SECRET_FB,
//     callbackURL: process.env.CALLBACK_URL_FB
//     }, (token, refreshToken, profile, done) => {return done(null, profile)}
// ));
passport.use(new githubStrategy({
    clientID: process.env.CLIENT_ID_GIT,
    clientSecret: process.env.CLIENT_SECRET_GIT,
    callbackURL: process.env.CALLBACK_URL_GIT
  },(token, refreshToken, profile, done) => {
    accounts.findOne({id: profile.id}).then((currentUser) => {
        if (currentUser) {
           done(null, currentUser);
        } else {
           new accounts({
              id: profile.id,
              username: profile.displayName,
              picture: "avatar.png"
           })
           .save()
           .then( (newUser) => {
              done(null, newUser);
           });
        }
     })
  }
));
