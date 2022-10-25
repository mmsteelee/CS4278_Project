const jwt           = require('jsonwebtoken')
const dotenv        = require('dotenv')
const getBaseUrl    = require('./getBaseUrl')

dotenv.config();

const auth = function(req, res, next) {
    console.log('Auth request: ' + req)
    const token = req.token

    // if(!token){
    //     res.status(401).json({msg: "Access denied. No token provided"})
    // }
    // try{
    //     const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
    //     req.user = decodedUser.user
    //     next()
    // }catch(err){
    //     res.redirect(`${getBaseUrl()}`)
    //     res.clearCookie("token")
    //     res.status(400).send("Token is not valid")
    // }
    next()
}

module.exports = auth;