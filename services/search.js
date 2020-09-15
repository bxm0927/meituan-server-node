const MenuModel = require('../models/menu')

const menu = async (ctx) => {
  const result = await MenuModel.findOne()
  if (result) {
    ctx.body = { code: '0', data: result.menu, msg: '' }
  }
}

module.exports = {
  menu,
}
