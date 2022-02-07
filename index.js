require('dotenv').config()
// Connect DB
const {connectDB} = require('./config/db')
connectDB()
//
const express = require('express')
const mongoose = require('mongoose')
const app = express();
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res)=>{
    res.render('index')
})
app.use('/login', (req, res) =>{
    res.render('login')
})
app.use('/profile', (req, res) =>{
    res.render('profile')
})
//running
app.listen(process.env.APP_PORT, ()=>console.log('http://localhost:8080'))