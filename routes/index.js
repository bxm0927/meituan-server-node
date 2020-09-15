/*
 * 路由注册
 * 后面路由复杂了，可以考虑对路由进行自动注册
 *
 * @Author: xiaoming.bai
 * @Date: 2020-09-15 11:02:31
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-15 13:24:11
 */

const users = require('./users')

module.exports = (app) => {
  app.use(users.routes(), users.allowedMethods())
}
