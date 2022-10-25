const express = require('express')
const login = require('../controllers/auth/login')
const auth  = require('../middlewares/auth')
const Acount = require('../models/Account')

// initialize router
const router = express.Router()

// POST at path: http://localhost:8080/auth/login
router.post('/login', login)

// GET at path: http://localhost:8080/auth/user
router.get('/user', auth, async (req, res) => {
    console.log('test ' + req.params)
    // Acount.findById(req.user._id)
    //     .then(user => res.send(user))
})

module.exports = router
