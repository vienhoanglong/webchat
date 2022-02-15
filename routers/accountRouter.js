const Router = require('express').Router()
const passport = require('passport')
const accountController = require('../controllers/accountController');
const validators = require('../routers/validators/validations')
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
Router.get('/',accountController.getIndex);
Router.get('/signup',accountController.getSignUp)
Router.get('/signin',accountController.getSignIn)
Router.post('/signup',validators.signUpValidator,accountController.signUp)
Router.post('/signin', validators.signInValidator,accountController.signIn)
module.exports = Router;