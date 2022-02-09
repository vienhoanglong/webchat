const Router = require('express').Router()
const passport = require('passport')

Router.get('/auth/google', passport.authenticate('google', { scope: 'email'}));

Router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/index',
        failureRedirect: '/login' 
}));

Router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));

Router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/index',
        failureRedirect: '/login' 
}));

Router.get('/auth/github', passport.authenticate('github'));
 
Router.get('/auth/github/callback', 
  passport.authenticate('github', {
        successRedirect : '/index', 
        failureRedirect: '/login' 
}));
module.exports = Router;