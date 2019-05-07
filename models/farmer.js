var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection)
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types

var Farmer = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    cooperativeId: {
      type: SchemaTypes.ObjectId,
      ref: 'CooperativeModel',
      required: true
    },
    address: {
      type: String,
      default: ''
    },
    treeIds: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'TreeModel'
      }
    ],
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    codeId:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  })

Farmer.plugin(autoIncrement.plugin, { model: 'FarmerModel', field: 'id' })

var FarmerModel = mongoose.model('FarmerModel', Farmer)
FarmerModel.createIndexes()
module.exports = FarmerModel
