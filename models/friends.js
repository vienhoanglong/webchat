const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:'User', required: true},
    friends: [
        {
            user: {
                type: Schema.Types.ObjectId, 
                required: true,
                ref:'User'
            }
        }
    ]
})

const Friends =  mongoose.model('Friends', friendSchema)

module.exports = Friends