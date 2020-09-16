const mongoose = require('mongoose')

const Poi = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  areaCode: {
    type: Number,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  add: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  module: {
    type: String,
    required: true,
  },
  longtide: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Poi', Poi)
