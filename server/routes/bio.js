const express = require('express')
const {adminAuth}  = require('../middlewares/auth')
const {changeBio, getBios, newBio, deleteBio} = require('../controllers/bio')

const router = express.Router()

router.post('/:id', adminAuth, changeBio)

router.get('/', getBios)

router.post('/new', adminAuth, newBio)

router.delete('/delete/:id', adminAuth, deleteBio)

module.exports = router