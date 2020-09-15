/*
 * Configuration
 * @Author: xiaoming.bai
 * @Date: 2020-09-04 17:21:47
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-14 00:45:21
 */

const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
const MONGO_HOST = isProd ? process.env.MONGO_HOST : 'localhost'
const MONGO_PORT = isProd ? process.env.MONGO_PORT : '27017'
const MONGO_DATABASE = 'meituan'

module.exports = {
  // Node.js 服务器监听地址
  port: 4000,

  // 静态文件托管地址
  staticPath: path.join(__dirname, '../public'),

  // 模版引擎路径
  templatePath: path.join(__dirname, '../views'),

  // MongoDB URI
  dbs: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,

  // Redis
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },

  // SMTP 邮箱服务器
  smtp: {
    host: 'smtp.qq.com',
    port: '465',
    user: '80583600@qq.com',
    pass: 'xqudglxcstlxcahe', // QQ邮箱需要使用授权码
    /**
     * 随机生成一个 4 位数的验证码，用于邮箱注册
     * 生成过程: 0.11752399794044766 -> "0.1e160d7fa63eb" -> "1e16" -> "1E16"
     */
    get code() {
      return () => Math.random().toString(16).slice(2, 6).toUpperCase()
    },
    /**
     * 验证码过期时间，默认五分钟
     */
    get expire() {
      const oneMinute = 1000 * 60 * 5
      return () => new Date().getTime() + oneMinute
    },
  },
}

// 日后多环境多配置的情况下，可以使用下面的配置文件结构
// const env = process.env.NODE_ENV
// const config = require('./config')[env]
// {
//   development: {},
//   test: {},
//   production: {},
// }
