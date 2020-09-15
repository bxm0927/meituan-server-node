/*
 * 用户相关服务
 * @Author: xiaoming.bai
 * @Date: 2020-09-13 16:57:34
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-15 11:01:40
 */

const redisClient = require('koa-redis').client
const nodemailer = require('nodemailer')
const UserModel = require('../models/users')
const passport = require('../utils/passport')
const { smtp } = require('../config')

/**
 * 用户登录
 */
const login = async (ctx, next) => {
  return passport.authenticate('local', (err, user, info) => {
    if (err) {
      ctx.body = { code: '-1', data: err, msg: '登录失败' }
      return
    }

    if (!user) {
      ctx.body = { code: '-1', data: null, msg: info }
      return
    }

    ctx.body = { code: '0', data: user, msg: '登录成功' }
    ctx.login(user)
  })(ctx, next)
}

/**
 * 用户注册
 */
const register = async (ctx) => {
  const { username, password, email, code } = ctx.request.body
  if (!username || !password || !email || !code) {
    ctx.body = { code: '-1', data: null, msg: '参数错误' }
    return
  }

  // 校验 验证码 是否正确
  const savedCode = await redisClient.hget(`nodemail:${username}`, 'code')
  if (savedCode !== code) {
    ctx.body = { code: '-1', data: null, msg: '验证码错误' }
    return
  }

  // 校验 验证码 是否已过期
  const expire = await redisClient.hget(`nodemail:${username}`, 'expire')
  if (expire < new Date().getTime()) {
    ctx.body = { code: '-1', data: null, msg: '验证码已过期，请重新获取' }
    return
  }

  // 校验 用户名是否已注册
  const user = await UserModel.findOne({ username })
  if (user) {
    ctx.body = { code: '-1', data: null, msg: '该用户名已存在' }
    return
  }

  const newUser = new UserModel({ username, password, email })
  const result = await newUser.save()
  ctx.body = { code: '0', data: result, msg: '注册成功' }
}

/**
 * 获取邮箱验证码
 * 使用 nodemailer 发送邮件
 * 使用 QQ邮箱服务
 */
const verify = async (ctx) => {
  const { username, email } = ctx.request.body
  if (!username || !email) {
    ctx.body = { code: '-1', data: null, msg: '参数错误' }
    return
  }

  // 避免多次请求验证码
  const savedExpire = await redisClient.hget(`nodemail:${username}`, 'expire')
  if (savedExpire && savedExpire > new Date().getTime()) {
    ctx.body = { code: '-1', data: null, msg: '请求频繁，请稍后再试' }
    return
  }

  const code = smtp.code()
  const expire = smtp.expire()

  // 开启一个 SMTP 连接池
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: true, // true for port 465, false for port 587
    secureConnection: true, // use SSL
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  })

  // 使用上面已创建的传输器(transporter)的 sendMail 方法传递消息对象
  const info = await transporter.sendMail({
    from: `"认证邮件" <${smtp.user}>`,
    to: email,
    subject: '【美团网】注册验证码 📮',
    html: `<h3>【美团网】你的注册验证码为：${code}</h3>`,
  })

  redisClient.hmset(`nodemail:${username}`, 'code', code, 'expire', expire, 'email', email)
  ctx.body = { code: '0', data: info, msg: '邮件已发送' }
}

/**
 * 退出登录
 */
const logout = async (ctx) => {
  await ctx.logout()
  // 校验是否真的退出成功
  if (ctx.isAuthenticated()) {
    ctx.body = { code: '-1', data: null, msg: '退出失败' }
    return
  }
  ctx.body = { code: '0', data: null, msg: '退出成功' }
}

/**
 * 用户详细信息
 * 只有已登录的用户，才能查询到自己的信息
 */
const info = async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = { code: '-1', data: null, msg: '请先登录' }
    return
  }

  const { username, email } = ctx.session.passport.user
  ctx.body = {
    code: '0',
    data: { username, email },
    msg: '请求成功',
  }
}

module.exports = {
  login,
  register,
  verify,
  logout,
  info,
}
