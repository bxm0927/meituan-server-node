const router = require('koa-router')()
const UserModel = require('../models/users')

router.prefix('/users')

// 新增一个用户
router.post('/add', async (ctx, next) => {
  const { name, age } = ctx.request.body
  const user = new UserModel({ name, age })
  const result = await user.save()
  ctx.body = { code: 0, data: result, msg: '' }
})

// 删除一个用户
router.delete('/remove', async (ctx, next) => {
  const { name } = ctx.request.body
  const result = await UserModel.where({ name }).deleteOne()
  ctx.body = { code: 0, data: result, msg: '' }
})

// 修改用户信息
router.post('/update', async (ctx, next) => {
  const { name, age } = ctx.request.body
  const result = await UserModel.where({ name }).updateOne({ age })
  ctx.body = { code: 0, data: result, msg: '' }
})

// 查询单个用户详情
router.get('/detail', async (ctx, next) => {
  const { name } = ctx.request.query
  const result = await UserModel.findOne({ name })
  ctx.body = { code: 0, data: result, msg: '' }
})

// 获取用户列表
router.get('/list', async (ctx, next) => {
  const result = await UserModel.find()
  ctx.body = { code: 0, data: result, msg: '' }
})

module.exports = router
