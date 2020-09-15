/*
 * 地理位置相关接口
 * @Author: xiaoming.bai
 * @Date: 2020-09-15 21:31:30
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-16 00:29:38
 */

const Router = require('koa-router')
const geoService = require('../services/geo')

const router = new Router({
  prefix: '/geo',
})

router.get('/poi', geoService.poi)

module.exports = router
