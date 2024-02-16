const User = require('../models/user')
const Friend = require('../models/friends')
const Room = require('../models/room')

// 0: Friend request
// 1: Accept
// 2: Reject
// 3: Unfriend

const addfriend = async(req, res) =>{
   try{
       let sender = req.body.userId
       let receiver = req.body.user_id
       let checkFriend = await Friend.findOne({
           sender: receiver, 
           receiver: sender
        }) 
        if(checkFriend != null){
            if(checkFriend.status == '0' || checkFriend.status == '1'){
                return res.status(200).json({
                    message: 'Đối phương đã gửi lời mời kết bạn hoặc đã là bạn!'
                })
            }
            checkFriend.status == '0'
        }
        let isFriend = await Friend.findOne({
            sender: sender, 
           receiver: receiver
        })
        if(isFriend != null){
            if(isFriend.status == '1'){
                return res.status(200).json({
                    message: 'Đã gửi lời mời kết bạn trước đó!' 
                })
            }
            isFriend.status = '0'
            isFriend.save()
            res.status(200).json({
                message: 'Gửi lời mời kết bạn thành công!'
            })
        }else{
            let status = 0
            const requestFriend = new Friend({
                sender: sender, 
                receiver: receiver, 
                status: status
            })
            requestFriend.save()
            res.status(200).json({
                message: 'Gửi lời mời kết bạn thành công!',
                data: requestFriend
            })
        }
   }catch(err){
       res.status(500).json(err)
   } 
}
const getRequestFriend = async(req, res) => {
    try{
        let receiver = req.body.userId
        let requested = await Friend.find({
            receiver: receiver,
            status: '0'
        }).distinct('sender')
        let users = await User.find().where('_id').in(requested).populate('image').exec()
        res.status(200).json({
            message: 'Danh sách yêu cầu kết bạn',
            data: {
                friends: users
            }
        })
    }catch(err){
        res.status(500).json(err)
    }
}
const acceptFriend = async(req, res) =>{
    try{
        let sender = req.body.sender
        let receiver = req.body.receiver
        let isAccept = req.body.isAccept
        let friend = await Friend.findOne({
            sender: sender, 
           receiver: receiver
        })
        console.log(friend)
        if (isAccept != '1' && isAccept != '2') {
            return res.status(200).json({
                message: 'Không đúng yêu cầu',
                data: friend,
            })
        }
        if (friend.status == '1' && isAccept == '2') {
            return res.status(200).json({
                message: 'Không đúng yêu cầu 1',
                data: friend,

            })
        }
        friend.status = isAccept
        friend.save()
        let msg
        if(isAccept == '1'){
            msg = 'Kết bạn thành công!'
            //Create new room
            const newRoom = new Room({
                members:[req.body.sender, req.body.receiver]
            })
            newRoom.save()
        }else{
            msg = 'Từ chối kết bạn thành công'
        }
        res.status(200).json({
            message: msg,
            data: friend
        })

    }catch(err){
        res.status(500).json(err)
    }
}
const unfriend = async(req, res) =>{
    try{
        let sender = req.body.sender
        let receiver = req.body.receiver
        let beFriend
        let checkFriend1 = await Friend.findOne({
            sender: sender,
            receiver: receiver
        })
        let checkFriend2 = await Friend.findOne({
            sender:receiver,
            receiver:sender
        })
        if(checkFriend1 != null){
            beFriend = checkFriend1
        }else{
            beFriend = checkFriend2
        }
        if(beFriend.status != 1){
            return res.status(200).json({
                message: 'Không thể thực hiện'
            })
        }
        beFriend.status = '3'
        beFriend.save()
        res.status(200).json({
            message: 'Xóa bạn thành công',
            data: beFriend
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}
const listfriend = async(req, res, next) =>{
    try{
        let user = req.body.userId
        let requested = await Friend.find({sender: user, status: '1' }).distinct('receiver')
        let accepted = await Friend.find({receiver: user, status: "1" }).distinct('sender')
        let users = await User.find().where('_id').in(requested.concat(accepted)).populate('image').populate('image').exec()
        res.status(200).json({
            message: 'Danh sách bạn bè',
            data:{
                friends: users
            }
        })
    
    }catch(err){
        res.status(500).json(err)
    }
}
const showlistfriend = async(req, res)=>{
    try{
        let requested = await Friend.find({sender: req.params.userId, status:'1'}).distinct('receiver')
        let listFriend = await User.find().where('_id').in(requested).populate('image').exec()
        res.status(200).json({
            message: `Danh sách bạn bè của: ${req.params.userId}`,
            data:{
                friends: listFriend
            }
        })
    }catch(err){
        res.status(500).json(err)
    }
}
module.exports = {
    addfriend,
    getRequestFriend,
    acceptFriend,
    unfriend,
    listfriend,
    showlistfriend
} 