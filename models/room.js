const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomChatScheme = new Schema({
    idRoom: {type: String},
    members: {type: Schema.Types.ObjectId, ref='User'},
    createdAt: { type: Date, default: Date.now },
    messages: { type: Number, default: 0 },
})
const Room = mongoose.model('Room', roomChatScheme)
module.exports = Room