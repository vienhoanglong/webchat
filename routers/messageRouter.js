const router = require('express').Router()
const messageController = require('../controllers/messageController')

router.post('/',messageController.postMessage)
router.get('/:roomId', messageController.getMessage)

module.exports = router