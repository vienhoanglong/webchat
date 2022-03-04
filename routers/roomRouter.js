const router = require('express').Router()
const roomController = require('../controllers/roomController')

router.post('/', roomController.postRoom)
router.get('/:userId', roomController.getRoom)
router.get('/find/:firstId/:secondId', roomController.getAvailableRoom)

module.exports = router