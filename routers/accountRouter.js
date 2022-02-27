const Router = require('express').Router()
const passport = require('passport')
const accountController = require('../controllers/accountController');
const validators = require('../routers/validators/validations')
const checkLoggedIn = require('../middlewares/checkLoggedIn')
// Login with google
Router.get('/auth/google', passport.authenticate('google', { scope : ['profile','email']}));

Router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/',
        failureRedirect: '/login',
}));
// Login with github
Router.get('/auth/github',passport.authenticate('github', { scope : ['profile','email']}));
 
Router.get('/auth/github/callback', 
  passport.authenticate('github', {
        successRedirect : '/', 
        failureRedirect: '/login' 
}));
// 
Router.get('/',accountController.getIndex);

//Login
Router.get('/login',accountController.getLogin)
Router.post('/login',validators.signInValidator, accountController.postLogin)
Router.post('/login',validators.signUpValidator, accountController.postLogin)
//Forgot
Router.get('/forgot',accountController.postForgot)
module.exports = Router;
