const Koa = require('koa');
const json = require('koa-json');
const views = require('koa-views');
const consola = require('consola');
const onerror = require('koa-onerror');
const KoaStatic = require('koa-static');
const KoaLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const redisStore = require('koa-redis');
const KoaSession = require('koa-generic-session');
const MyLogger = require('./middlewares/MyLogger');
const { dbs, staticPath, templatePath } = require('./config');

const app = new Koa();

// Error Handler
onerror(app);

// Middlewares
app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));
app.use(json());
app.use(KoaStatic(staticPath));
app.use(KoaLogger());
app.use(MyLogger);

// Template Engines
app.use(views(templatePath, { extension: 'pug' }));

// routes
const index = require('./routes');
const users = require('./routes/users');

app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// Connecting to MongoDB 🔗
mongoose.connect(dbs, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connecting to Redis 🔗
app.keys = ['keys', 'keykeys'];
app.use(KoaSession({ store: redisStore() }));

// error-handling
app.on('error', (err, ctx) => {
  consola.error('server error', err, ctx);
});

module.exports = app;
