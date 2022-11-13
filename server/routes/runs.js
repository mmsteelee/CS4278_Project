// Routes for run requests 

const express = require('express')
const {auth}  = require('../middlewares/auth')

const router = express.Router()

router.get('/:id', getRun)

router.get('/search', searchRuns)

router.post('/new', auth ,makeRun)

module.exports = router