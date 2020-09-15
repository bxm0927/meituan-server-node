/*
 * 用户相关接口
 * @Author: xiaoming.bai
 * @Date: 2020-09-13 16:57:34
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-15 10:10:47
 */

const Router = require('koa-router')
const userService = require('../services/users')

const router = new Router({
  prefix: '/users',
})

// 用户登录
router.get('/login', userService.login)

// 用户注册
router.post('/register', userService.register)

// 获取邮箱验证码
router.post('/verify', userService.verify)

// 退出登录
router.get('/logout', userService.logout)

// 用户详细信息
router.get('/info', userService.info)

module.exports = router
