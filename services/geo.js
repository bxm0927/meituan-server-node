const Provinces = require('../models/provinces')
const Cities = require('../models/cities')

const poi = (ctx) => {
  ctx.body = {
    code: '0',
    data: { province: '海南省', city: '三亚' },
    msg: '',
  }
}

const provinces = async (ctx) => {
  const result = await Provinces.find({}, { _id: 0 }) // 不查询 _id
  if (result) {
    ctx.body = { code: '0', data: result, msg: '' }
  }
}

const cities = async (ctx) => {
  const result = await Cities.find({}, { _id: 0, id: 0 })
  if (result) {
    ctx.body = {
      code: '0',
      data: result.map((i) => i.value).flat(),
      msg: '',
    }
  }
}

const provinceCities = async (ctx) => {
  const { provinceId } = ctx.params
  const result = await Cities.findOne({ id: provinceId })
  if (result) {
    ctx.body = { code: '0', data: result.value, msg: '' }
  }
}

module.exports = {
  poi,
  provinces,
  cities,
  provinceCities,
}
