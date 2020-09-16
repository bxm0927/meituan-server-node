const mongoose = require('mongoose')

const City = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  value: {
    type: Array,
    required: true,
  },
})

module.exports = mongoose.model('City', City)
