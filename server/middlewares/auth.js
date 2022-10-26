const jwt           = require('jsonwebtoken')
const dotenv        = require('dotenv')
const getBaseUrl    = require('./getBaseUrl');
const { user } = require('../controllers/auth');

dotenv.config();

const auth = function(req, res, next) {
    const token = req.cookies.token

    if(!token){
        res.status(401).json({msg: "Access denied. No token provided"})
    }
    try{
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedUser
        console.log(decodedUser)
        next()
    }catch(err){
        res.redirect(`${getBaseUrl()}`)
        res.clearCookie("token")
        res.status(400).send("Token is not valid")
    }
}

const adminAuth = async function(req, res, next) {
    const token = req.cookies.token

    if(!token){
        res.status(401).json({msg: "Access denied. No token provided"})
    }
    try{
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
        user = await Account.findById(decodedUser.id)
        if (user.role == 'admin') {
            req.user = decodedUser
            next()
        } else {
            res.status(401).send('User does not have admin privilages')
        }
    }catch(err){
        res.redirect(`${getBaseUrl()}`)
        res.clearCookie("token")
        res.status(400).send("Token is not valid")
    }
}

module.exports = {auth, adminAuth};