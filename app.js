require('dotenv').config()
require('./services/passport')
// Connect DB
const {connectDB} = require('./config/db')
connectDB()
//
const express = require('express')
const path = require('path')
const session = require('express-session')
var cookieParser = require('cookie-parser')
const passport = require('passport')
const flash = require('express-flash')
const accountRouter = require('./routers/accountRouter')
const app = express();


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
// Set path views
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use('/',accountRouter)

// app.get('/', (req, res)=>{
//     res.render('login')
// })
// app.use('/login', (req, res) =>{
//     res.render('login')
// })
// app.use('/profile', (req, res) =>{
//     res.render('profile')
// })
// app.use('/index', (req, res) =>{
//     res.render('index')
// })

//running
app.listen(process.env.APP_PORT, ()=>console.log('http://localhost:8080'))