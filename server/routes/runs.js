// Routes for run requests 

const express = require('express')
const {auth}  = require('../middlewares/auth')
const {getRun, searchRuns, makeRun} = require('../controllers/runs')

const router = express.Router()

router.get('/:id', getRun)

router.get('/search', searchRuns)

router.post('/new', auth ,makeRun)

module.exports = router