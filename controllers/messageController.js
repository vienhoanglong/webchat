const Room = require('../models/room')
const Message = require('../models/messages')
const User = require('../models/user')
const getMessage = async(req, res) =>{
    try{
        const messages = await Message.find({
            roomId: req.params.roomId
        })
        // Load data user
        const room = await Room.find({
            _id: req.params.roomId
        }).distinct('members')
        // let member1 = room[0]
        // let member2 = room[1]
        // Load info friend chat
        const friend = await User.findOne({
            _id: room[1]
        })
        // console.log(friend)
        res.render('chat',{messages, room, friend})
        // res.status(200).json(messages); 
    }catch(err){
        res.status(500).json(err)
    }
    
}
const postMessage = async(req, res) =>{
    try{
        const newMessage = new Message(req.body)
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
    postMessage,
}
