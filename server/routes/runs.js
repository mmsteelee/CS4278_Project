// Routes for run requests 

const express = require('express')
const {auth}  = require('../middlewares/auth')

const router = express.Router()

router.post()

router.get('/:id', getRun)

router.get('/search/:tags', searchRuns)

router.post('/new', auth ,makeRun)

module.exports = router