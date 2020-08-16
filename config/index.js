const path = require('path')

module.exports = {
  // 服务器监听地址
  port: 3010,

  // MongoDB URI
  dbs: 'mongodb://localhost:27017/meituan',

  // 静态文件托管地址
  staticPath: path.join(__dirname, '../public'),
}
