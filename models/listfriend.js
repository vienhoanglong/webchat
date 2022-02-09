const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    fullname: String,
    img: String,
});


const friends =  mongoose.model('listfriend', friendSchema);

module.exports = friends;