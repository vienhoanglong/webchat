const Router = require('express').Router()
const passport = require('passport')
const accountController = require('../controllers/accountController');
const validators = require('../routers/validators/validations')
// Login with google
Router.get('/auth/google', passport.authenticate('google', { scope: 'email'}));

Router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/index',
        failureRedirect: '/login' 
}));
// Login with facebook
Router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));

Router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/index',
        failureRedirect: '/login' 
}));
// Login with github
Router.get('/auth/github', passport.authenticate('github'));
 
Router.get('/auth/github/callback', 
  passport.authenticate('github', {
        successRedirect : '/index', 
        failureRedirect: '/login' 
}));
// 
Router.get('/',accountController.getIndex);

//Login
Router.get('/login',accountController.getLogin)
Router.post('/login',validators.signInValidator, accountController.postLogin)
Router.post('/login',validators.signUpValidator, accountController.postLogin)
module.exports = Router;
