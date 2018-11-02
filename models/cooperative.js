var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types

var Cooperative = new Schema({
  id: String,
  name: {
    type: String,
    required: true
  },
  taxCode: {
    type: SchemaTypes.String,
    required: true,
    unique: true
  },
  idRepresentation: {
    type: String,
    required: true
  },
  email: {
    type: SchemaTypes.String,
    required: true,
    unique: true
  },
  password: {
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
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// MangoTree.index({ name: 2, category: 3 })
Cooperative.index({ email: 1, taxCode: 1 }, { unique: true })

var CooperativeModel = mongoose.model('CooperativeModel', Cooperative)
CooperativeModel.createIndexes()
module.exports = CooperativeModel
