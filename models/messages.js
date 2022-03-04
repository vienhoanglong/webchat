const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageScheme = new Schema({
    roomId: String,
    sender: String,
    message: {type: String, trim: true, minlength:1, required: true},
    media: String,

},{ timestamps: true })
const Message =  mongoose.model('Message', messageScheme)
module.exports = Message