require('dotenv').config()
// Connect DB
const {connectDB} = require('./config/db')
connectDB()
//
const express = require('express')
const path = require('path')

const session = require('express-session')
var cookieParser = require('cookie-parser')

const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
const facebookStrategy = require('passport-facebook').Strategy

const mongoose = require('mongoose')
const app = express();

// Set path views
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}))
// Set views engine
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
    }, (token, refreshToken, profile, done) => {return done(null, profile)}
))
passport.use(new facebookStrategy({
    clientID: "498234237834289",
    clientSecret: "09702b5d458cc46dddcf30cec9583879",
    callbackURL: process.env.CALLBACK_URL_FB
    }, (token, refreshToken, profile, done) => {return done(null, profile)}
))
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

app.get('/auth/google', passport.authenticate('google', { scope: 'email'}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/index',
        failureRedirect: '/failed' 
}));

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/index',
        failureRedirect: '/failed' 
}));
app.get('/', (req, res)=>{
    res.render('login')
})
app.use('/login', (req, res) =>{
    res.render('login')
})
app.use('/profile', (req, res) =>{
    res.render('profile')
})
app.use('/index', (req, res) =>{
    res.render('index')
})




//running
app.listen(process.env.APP_PORT, ()=>console.log('http://localhost:8080'))