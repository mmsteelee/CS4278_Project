const express = require('express')
const {adminAuth}  = require('../middlewares/auth')
const {changeBio, getBios, newBio, deleteBio} = require('../controllers/bio')

const router = express.Router()

router.post('/new', adminAuth, newBio)

router.get('/', getBios)

router.post('/update/:id', adminAuth, changeBio)

router.delete('/delete/:id', adminAuth, deleteBio)

module.exports = router