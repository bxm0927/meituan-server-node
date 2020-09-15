const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
  menu: {
    type: Array,
    required: true,
  },
})

module.exports = mongoose.model('Menu', MenuSchema)
