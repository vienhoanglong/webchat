require('dotenv').config()
require('./config/passport')
// Connect DB
const {connectDB} = require('./config/db')
connectDB()
//
const express = require('express')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('express-flash')
const accountRouter = require('./routers/accountRouter')
const messageRouter = require('./routers/messageRouter')
const roomRouter = require('./routers/roomRouter')
const friendRouter = require('./routers/friendRouter')
const app = express();

// Set views engine
app.set('view engine', 'ejs')
// Set path 
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'))

app.use(cookieParser())
app.use(session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true, 
}))
app.use(express.json());
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',accountRouter)
app.use('/message', messageRouter)
app.use('/room', roomRouter)
app.use('/friend', friendRouter)

// app.get('/', (req, res)=>{
//     res.render('login')
// })
// app.use('/login', (req, res) =>{
//     res.render('login')
// })
// app.use('/profile', (req, res) =>{
//     res.render('profile')
// })
app.use('/index', (req, res) =>{
    res.render('index')
})


//running
app.listen(process.env.APP_PORT, ()=>console.log('http://localhost:8080'))