const router = require('express').Router()
const passport = require('passport')
const accountController = require('../controllers/accountController');
const validators = require('../validators/validations')
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
//Forgotpassword
router.get('/forgot',accountController.getForgot)
router.post('/forgot',validators.forgotPasswordValidator,accountController.postForgot)
//changepassword
router.get('/change/:userId/:token',accountController.getChange)
router.post('/change/:userId/:token',validators.changePasswordValidator,accountController.postChange)

module.exports = router;
