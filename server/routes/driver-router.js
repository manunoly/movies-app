
const express = require('express')

const DriverControler = require('../controllers/driver-controler')

const router = express.Router()

router.post('/create', DriverControler.create)
router.put('/update/:id', DriverControler.updateById)
router.delete('/delete/:id', DriverControler.deleteById)
router.get('/show/:id', DriverControler.getById)
router.get('/all', DriverControler.getAll)

module.exports = router
