/*
 * 使用 Passport 进行身份验证
 * @Author: xiaoming.bai
 * @Date: 2020-09-13 19:33:03
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-15 09:54:53
 */

const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../models/users')

const localStrategy = new LocalStrategy((username, password, done) => {
  UserModel.findOne({ username }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false, '该用户不存在')
    }
    if (user.password !== password) {
      return done(null, false, '用户名或密码错误')
    }
    return done(null, user)
  })
})

passport.use(localStrategy)

// Sessions
// serializeUser   在用户登录成功以后, 将用户数据存储到 session 中
// deserializeUser 在每次请求的时候, 从 session 中读取用户数据, 即 ctx.session.passport
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

module.exports = passport
