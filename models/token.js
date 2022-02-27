const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },
    token:{
        type: String,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now,
        expires: 3600
    }
})
const Token = mongoose.model('Token', tokenSchema)
module.exports = Token
