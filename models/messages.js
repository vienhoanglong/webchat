const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageScheme = new Schema({
    sender:{type: Schema.Types.ObjectId, ref:'User'},
    receiver:{type: Schema.Types.ObjectId, ref: 'User'},
    message: {type: String, trim: true,minlength:1, required: true},
    messageType: {type: String, required: true},
    photo: String,
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }

})
const Message =  mongoose.model('Message', messageScheme)

module.exports = Message