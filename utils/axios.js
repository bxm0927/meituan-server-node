/*
 * 封装 Axios
 * @Author: xiaoming.bai
 * @Date: 2020-09-13 18:52:00
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2020-09-13 18:55:47
 */

const axios = require('axios')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '4000'

const instance = axios.create({
  baseURL: `http://${host}:${port}`,
  timeout: 1000 * 10, // 10s
})

module.exports = instance
