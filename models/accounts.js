const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    id:String,
    username : String,
    password: String,
    fullname: String,
    img: {type:String, default: "images/avatar.png"},
    listfriend:{type: Schema.Types.ObjectId , ref: 'listfriend'}
});


const account =  mongoose.model('accounts', accountSchema);

module.exports = account;
