
const express = require('express')

const RouteControler = require('../controllers/route-controler')

const router = express.Router()

router.post('/create', RouteControler.create)
router.put('/update/:id', RouteControler.updateById)
router.delete('/delete/:id', RouteControler.deleteById)
router.get('/show/:id', RouteControler.getById)
router.get('/driver/:id', RouteControler.getByDriverId)
router.get('/driverHelper/:id', RouteControler.getByDriverIdHelper)
router.get('/all', RouteControler.getAll)

module.exports = router
