/*
 * 搜索相关接口
 * @Author: xiaoming.bai
 * @Date: 2020-09-15 21:31:58
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-16 00:34:28
 */

const Router = require('koa-router')
const searchService = require('../services/search')

const router = new Router({
  prefix: '/search',
})

// 首页分类菜单
router.get('/menu', searchService.menu)

// router.get('/top', (ctx) => {})

// router.get('/hot', (ctx) => {})

// router.get('/products', (ctx) => {})

// router.get('/products/:id', (ctx) => {})

module.exports = router
