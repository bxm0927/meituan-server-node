/*
 * 路由注册
 * 后面路由复杂了，可以考虑对路由进行自动注册
 *
 * @Author: xiaoming.bai
 * @Date: 2020-09-15 11:02:31
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-15 23:16:31
 */

const users = require('./users')
const geo = require('./geo')
const search = require('./search')

module.exports = (app) => {
  app.use(users.routes(), users.allowedMethods())
  app.use(geo.routes(), geo.allowedMethods())
  app.use(search.routes(), search.allowedMethods())
}
