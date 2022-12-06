const express = require('express')
const {adminAuth}  = require('../middlewares/auth')
const {get ,grant, revoke} = require('../controllers/admin')

const router = express.Router()

router.get('/', adminAuth, get)

router.put('/grant', adminAuth, grant)

router.put('/revoke', adminAuth, revoke)

module.exports = router