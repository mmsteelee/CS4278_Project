const express = require('express')
const login = require('../controllers/auth/login')
const auth  = require('../middlewares/auth')
const user = require('../controllers/auth/user')

// initialize router
const router = express.Router()

// POST at path: http://localhost:8080/auth/login
router.post('/login', login)

// GET at path: http://localhost:8080/auth/user
router.get('/user', auth, user)

module.exports = router
