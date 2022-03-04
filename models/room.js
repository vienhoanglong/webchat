const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomChatScheme = new Schema({
    members: {
        type: Array,
      },
      messages:{
        type:Number,
        default:0
      }
    },
    { timestamps: true }
)
const Room = mongoose.model('Room', roomChatScheme)
module.exports = Room