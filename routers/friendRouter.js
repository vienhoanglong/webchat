const router = require('express').Router()
const friendsController = require('../controllers/friendsController')

router.post('/', friendsController.addfriend)
router.post('/listrequest',friendsController.getRequestFriend)
router.post('/accept', friendsController.acceptFriend)
router.post('/unfriend', friendsController.unfriend)
router.post('/listfriend', friendsController.listfriend)
router.get('/:userId', friendsController.showlistfriend)
module.exports = router