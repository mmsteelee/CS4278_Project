const express = require('express')
const {login, user, exp} = require('../controllers/auth')
const auth  = require('../middlewares/auth')

const router = express.Router()

// @route       POST auth/login
// @desc        Post user google data
// @access      Public
router.post('/login', login)

// @route       GET auth/user
// @desc        Get user data
// @access      Private
router.get('/user', auth, user)

// @route       GET auth/exp
// @desc        Get token expiration time
// @access      Public
router.get('/exp', exp)

module.exports = router
