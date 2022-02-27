const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    id:String,
    fullname: String,
    username : String,
    email: String,
    password: String,
    img: {type:String, default: "avatar.png"},
    listfriend:{type: Schema.Types.ObjectId , ref: 'listfriend'} 
});


const User =  mongoose.model('User', userSchema)

module.exports = User
