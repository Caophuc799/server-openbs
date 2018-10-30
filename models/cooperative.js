var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
// var SchemaTypes = mongoose.Schema.Types

var Cooperative = new Schema({
  id: String,
  name: {
    type: String,
    required: true
  },
  idRepresentation: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})

// MangoTree.index({ name: 2, category: 3 })

var CooperativeModel = mongoose.model('CooperativeModel', Cooperative)

module.exports = CooperativeModel
