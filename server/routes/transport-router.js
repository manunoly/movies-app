
const express = require('express')

const TransportControler = require('../controllers/transport-controler')

const router = express.Router()

router.post('/create', TransportControler.create)
router.put('/update/:id', TransportControler.updateById)
router.put('/updateById/:id', TransportControler.updateByIdDirect)
updateByIdDirect
router.delete('/delete/:id', TransportControler.deleteById)
router.get('/show/:id', TransportControler.getById)
router.get('/driver/:id', TransportControler.getByDriverId)
router.get('/driverHelper/:id', TransportControler.getByDriverIdHelper)
router.get('/all', TransportControler.getAll)

module.exports = router
