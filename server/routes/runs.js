// Routes for run requests 

const express = require('express')
const {auth}  = require('../middlewares/auth')
const {getRun, searchRuns, makeRun} = require('../controllers/runs')

const router = express.Router()

router.get('/find', searchRuns)

router.post('/new', auth ,makeRun)

router.get('/:id', getRun)

module.exports = router