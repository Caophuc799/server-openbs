var mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection)
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types

var Cooperative = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    taxCode: {
      type: SchemaTypes.String,
      required: true,
      unique: true
    },
    logo: {
      type: String,
      default: ''
    },
    idRepresentation: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'UserModel'
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
    description: {
      type: String,
      required: true
    },
    location: {
      longitude: {
        type: String,
        default: ''
      },
      latitude: {
        type: String,
        default: ''
      }
    },
    active: {
      type: Boolean,
      default: true
    },
    verify: {
      type: Boolean,
      default: false
    },
    rand: {
      type: Number,
      default: 0
    },
    treeIds: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'TreeModel'
      }
    ]
  },
  {
    timestamps: true
  })

Cooperative.plugin(autoIncrement.plugin, { model: 'CooperativeModel', field: 'id' })
Cooperative.index({ email: 1, taxCode: 1 }, { unique: true })

var CooperativeModel = mongoose.model('CooperativeModel', Cooperative)
CooperativeModel.createIndexes()
module.exports = CooperativeModel
