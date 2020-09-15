const Koa = require('koa')
const json = require('koa-json')
const views = require('koa-views')
const serve = require('koa-static')
const onerror = require('koa-onerror')
const passport = require('koa-passport')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const mongoose = require('mongoose')
const consola = require('consola')
const logger = require('./middlewares/logger')
const config = require('./config')

// Connecting to MongoDB 🔗
mongoose.connect(config.dbs, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = new Koa()

// Error Handler
onerror(app)

// Middlewares
app.use(logger())
app.use(json())
app.use(serve(config.staticPath))
app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))

// Template Engines
app.use(views(config.templatePath, { extension: 'pug' }))

// Write Sessions to Redis
app.keys = ['meituan', 'keykeys']
app.use(session({ key: 'meituan', prefix: 'meituan:uid', store: redisStore() }))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Routes
require('./routes')(app)

// error-handling
app.on('error', (err, ctx) => {
  consola.error('server error', err, ctx)
})

module.exports = app
