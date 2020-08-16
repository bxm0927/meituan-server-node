const Koa = require('koa')
const json = require('koa-json')
const views = require('koa-views')
const static = require('koa-static')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const mongoose = require('mongoose')
const redisStore = require('koa-redis')
const session = require('koa-generic-session')
const MyLogger = require('./middlewares/MyLogger')

const { dbs,staticPath } = require('./config')

const app = new Koa()

// Error Handler
onerror(app)

// Middlewares
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())
app.use(static(staticPath))
app.use(logger())
app.use(MyLogger)

// Template Engines
app.use(views(__dirname + '/views', { extension: 'pug' }))

// routes
const index = require('./routes')
const users = require('./routes/users')
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// Connecting to MongoDB 🔗
mongoose.connect(dbs, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Connecting to Redis 🔗
app.keys = ['keys', 'keykeys']
app.use(session({ store: redisStore() }))

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
