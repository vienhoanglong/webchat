const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    id:String,
    fullname: String,
    username : String,
    email: String,
    password: String,
    image: {type:String, default: "avatar.png"},
    status: {
        type: String,
        default: "offline",
    },
}, {timestamps: true});


const User =  mongoose.model('User', userSchema)

module.exports = User
