const router = require('express').Router()
const passport = require('passport')
const accountController = require('../controllers/accountController');
const validators = require('../routers/validators/validations')
const checkLoggedIn = require('../middlewares/checkLoggedIn')
// Login with google
router.get('/auth/google', passport.authenticate('google', { scope : ['profile','email']}));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/',
        failureRedirect: '/login',
}));
// Login with github
router.get('/auth/github',passport.authenticate('github', { scope : ['profile','email']}));
 
router.get('/auth/github/callback', 
  passport.authenticate('github', {
        successRedirect : '/', 
        failureRedirect: '/login' 
}));
// 
router.get('/',accountController.getIndex);

//Login
router.get('/login',accountController.getLogin)
router.post('/login',validators.signInValidator, accountController.postLogin)
router.post('/login',validators.signUpValidator, accountController.postLogin)
//Forgot
router.get('/forgot',accountController.getForgot)
router.post('/forgot',validators.forgotPasswordValidator,accountController.postForgot)

module.exports = router;
