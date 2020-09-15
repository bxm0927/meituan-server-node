const poi = (ctx) => {
  ctx.body = {
    code: '0',
    data: { province: '上海市', city: '上海' },
    msg: '',
  }
}

module.exports = {
  poi,
}
