require('dotenv').config({ path: "./config.env" }) // Secures variables
const app = require('./utils/app') // Backend App (server)
const mongo = require('./utils/mongo') // MongoDB (database)
const {PORT} = require('./constants')
const authRoutes = require('./routes/auth')
const bioRoutes = require('./routes/bio')
const adminRoutes = require('./routes/admin')

async function bootstrap() {
  await mongo.connect()

  app.get('/', (req, res) => res.status(200).json({message: 'Hello World!'}))
  app.get('/healthz', (req, res) => res.status(200).send())
  app.use('/auth', authRoutes)
  app.use('/bio', bioRoutes)
  app.use('/admin', adminRoutes)

  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${PORT}`)
  })
}

bootstrap()
