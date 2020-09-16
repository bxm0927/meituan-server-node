/*
 * 搜索相关接口
 * @Author: xiaoming.bai
 * @Date: 2020-09-15 21:31:58
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-17 00:29:17
 */

const Router = require('koa-router')
const searchService = require('../services/search')

const router = new Router({
  prefix: '/search',
})

// 首页分类菜单
router.get('/menu', searchService.menu)

// 搜索词最佳推荐
router.get('/top', searchService.top)

// 热门搜索
router.get('/topsearches', searchService.topsearches)

// router.get('/products', (ctx) => {})

// router.get('/products/:id', (ctx) => {})

module.exports = router
