const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:String,
    username : String,
    password: String,
    email: String,
    fullname: String,
    img: {type:String, default: "avatar.png"},
    listfriend:{type: Schema.Types.ObjectId , ref: 'listfriend'} 
});


const User =  mongoose.model('User', userSchema);

module.exports = User;
