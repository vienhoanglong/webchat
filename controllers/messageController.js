const Room = require('../models/room')
const Message = require('../models/messages')

const getMessage = async(req, res) =>{
    try{
        const messages = await Message.find({
            roomId: req.params.roomId
        })
        res.status(200).json(messages); 
    }catch(err){
        res.status(500).json(err)
    }
    
}
const postMessage = async(req, res) =>{
    try{
        const newMessage = new Message(req.body);
        const saveMessage = await newMessage.save()
        await Room.findOneAndUpdate({
                _id: req.body.roomId,

            },
            {
                $inc:{messages :1},
            }
        )
        res.status(200).json(saveMessage)
    }catch(err){
        res.status(500).json(err)
    }
}
module.exports = {
    getMessage,
    postMessage
}