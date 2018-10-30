var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types

var MangoTree = new Schema({
  id: Number,
  name: {
    type: String,
    required: true
  },
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
      type: SchemaTypes.Double,
      required: true
    },
    latitude: {
      type: SchemaTypes.Double,
      required: true
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
        type: Number,
        required: true
      }
    }
  ]
})

// MangoTree.index({ name: 2, category: 3 })

var MangoTreeModel = mongoose.model('MangoTreeModel', MangoTree)

module.exports = MangoTreeModel
