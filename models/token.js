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
        type: Date, expires: '60s', default: Date.now 
    }
})
const Token = mongoose.model('Token', tokenSchema)
module.exports = Token
