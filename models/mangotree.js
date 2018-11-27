var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types

var MangoTree = new Schema({
  idTree: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  manyImages: [
    {
      type: String,
      default: []
    }
  ],
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timeStartPlant: {
    required: true,
    type: Date,
    default: Date.now
  },
  idCooperative: {
    type: String,
    required: true
  },
  idBuyer: {
    type: String,
    default: null
  },
  location: {
    longitude: {
      type: SchemaTypes.Number
    },
    latitude: {
      type: SchemaTypes.Number
    },
    descriptionLocation: {
      type: String
    }
  },
  oldBuyer: [{ oldIdBuyer: String }],
  productivity: [
    {
      time: {
        type: Date,
        default: Date.now
      },
      quantity: {
        type: Number
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    required: true
  },
  savedInEther: {
    type: Boolean,
    default: false
  }
})

MangoTree.index({ idTree: 1 }, { unique: true })

var MangoTreeModel = mongoose.model('MangoTreeModel', MangoTree)

MangoTreeModel.createIndexes()

module.exports = MangoTreeModel
