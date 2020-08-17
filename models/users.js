const mongoose = require('mongoose');

/**
 * 定义一个 Schema
 * Schema 对象用于定义文档结构，可以定义字段、字段类型、唯一性、索引、验证等。
 */
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  meta: {
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

// 将 Schema 发布为 Model
// 这将在数据库中新建一个名为 users 的 collection
const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
