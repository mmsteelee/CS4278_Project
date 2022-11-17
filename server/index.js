require('dotenv').config({ path: "./config.env" }) // Secures variable
const express = require('express')
const path = require("path");
const app = require('./utils/app') // Backend App (server)
const mongo = require('./utils/mongo') // MongoDB (database)
const {PORT} = require('./constants')
const authRoutes = require('./routes/auth')
const bioRoutes = require('./routes/bio')
const adminRoutes = require('./routes/admin')
const imageRoutes = require('./routes/images')
const runRoutes = require('./routes/runs')

async function bootstrap() {
  await mongo.connect()

  app.use(express.static(path.join(__dirname, 'build')));

  let clientPagePaths = 
    ['/', '/auth', '/links', '/findyourrun', 
     '/meettheteam', '/createarun', '/findarun',
     '/calendar', '/create', '/find']

  app.get(clientPagePaths, function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });  
  app.get('/healthz', (req, res) => res.status(200).send())
  app.use('/account', authRoutes)
  app.use('/bio', bioRoutes)
  app.use('/admin', adminRoutes)
  app.use('/image', imageRoutes)
  app.use('/runs', runRoutes)

  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${PORT}`)
  })
}

bootstrap()
