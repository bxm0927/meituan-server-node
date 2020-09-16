const Menu = require('../models/menu')
const Poi = require('../models/pois')

const menu = async (ctx) => {
  const result = await Menu.findOne()
  if (result) {
    ctx.body = { code: '0', data: result.menu, msg: '' }
  }
}

const top = async (ctx) => {
  const { word, city } = ctx.query
  const result = await Poi.find({ city, name: new RegExp(word) }, { _id: 0 })

  if (result) {
    ctx.body = { code: '0', data: result, msg: '' }
  }
}

const topsearches = async (ctx) => {
  const result = await Poi.find()
  if (result) {
    ctx.body = {
      code: '0',
      data: result.map((i) => i.name),
      msg: '',
    }
  }
}

module.exports = {
  menu,
  top,
  topsearches,
}
