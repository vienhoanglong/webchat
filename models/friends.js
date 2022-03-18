const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    status: {
        type: String,
        required: true,
    }
  }, {timestamps: true})
const Friends =  mongoose.model('Friends', friendsSchema)

module.exports = Friends