const Room = require('../models/room')

const getRoom = async(req, res) =>{
    try{
        const room = await Room.find({
            members:{
                $in:[req.params.userId]
            }
        })
        res.status(200).json(room)
    }catch(err){
        res.status(500).json(err)
    }
}
const getAvailableRoom = async(req, res) =>{
    try{
        const room = await Room.findOne({
            members:{
                $all:[req.params.firstId, req.params.secondId]
            }
        })
        res.status(200).json(room)
    }catch(err){
        res.status(500).json(err)
    }
}
const postRoom = async(req, res) =>{
    try{
        const newRoom  = new Room({
            members:[req.body.senderId, req.body.receiverId]
        })
        const saveRoom = await newRoom.save()
        res.status(200).json(saveRoom)
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    getRoom,
    getAvailableRoom,
    postRoom
}