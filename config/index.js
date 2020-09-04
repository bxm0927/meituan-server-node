/*
 * Configuration
 * @Author: xiaoming.bai
 * @Date: 2020-09-04 17:21:47
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-04 17:23:11
 */

const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const MONGO_HOST = isProd ? process.env.MONGO_HOST : 'localhost';
const MONGO_PORT = isProd ? process.env.MONGO_PORT : '27017';
const MONGO_DATABASE = 'meituan';

module.exports = {
  // 服务器监听地址
  port: 4000,

  // MongoDB URI
  dbs: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,

  // 静态文件托管地址
  staticPath: path.join(__dirname, '../public'),

  // 模版引擎路径
  templatePath: path.join(__dirname, '../views'),
};

// 日后多环境多配置的情况下，可以使用下面的配置文件结构
// const env = process.env.NODE_ENV
// const config = require('./config')[env]
// {
//   development: {},
//   test: {},
//   production: {},
// }
