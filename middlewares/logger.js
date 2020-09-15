const moment = require('moment')
const consola = require('consola')

module.exports = () => async (ctx, next) => {
  const start = new Date()
  await next()
  const end = new Date()
  const duration = end - start
  const time = moment(start).format('YYYY-MM-DD HH:mm:ss')
  consola.info(`${time} [${duration}ms] ${ctx.method} ${ctx.href}`)
}
