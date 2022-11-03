const express = require('express') // Backend App (server)
const cors = require('cors') // HTTP headers (enable requests)
const getBaseUrl = require('../middlewares/getBaseUrl')
const cookieParser  = require('cookie-parser')
// initialize app
const app = express()

// middlewares
app.use(cors({credentials: true, origin: `${getBaseUrl()}`}))
app.use(express.json({extended: true})) // body parser
app.use(express.urlencoded({extended: false})) // url parser
app.use(cookieParser())

// error handling
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send()
  next()
})

module.exports = app
