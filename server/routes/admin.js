const express = require('express')
const {adminAuth}  = require('../middlewares/auth')
const {grant, revoke} = require('../controllers/admin')

const router = express.Router()

router.put('/grant', adminAuth, grant)

router.put('/revoke', adminAuth, revoke)

module.exports = router