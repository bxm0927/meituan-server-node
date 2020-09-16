/*
 * 地理位置相关接口
 * @Author: xiaoming.bai
 * @Date: 2020-09-15 21:31:30
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-16 22:34:33
 */

const Router = require('koa-router')
const geoService = require('../services/geo')

const router = new Router({
  prefix: '/geo',
})

// 定位当前城市
router.get('/poi', geoService.poi)

// 查询所有省份
router.get('/provinces', geoService.provinces)

// 查询所有的城市
router.get('/cities', geoService.cities)

// 查询某个省份下所有的城市
router.get('/cities/:provinceId', geoService.provinceCities)

module.exports = router
