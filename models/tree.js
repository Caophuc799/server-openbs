var mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection)
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types

var Tree = new Schema(
  {
    numberId: {
      type: Number,
      required: true
    },
    cooperativeId: {
      type: SchemaTypes.ObjectId,
      ref: 'CooperativeModel',
      require: true
    },
    name: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    timeStartPlant: {
      type: String,
      required: true
    },
    location: {
      longitude: { type: String, require: true },
      latitude: { type: String, require: true }
    },
    category: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      require: true
    },
    startTimeSelling: {
      type: Date,
      default: Date.now
    },
    endTimeSelling: {
      type: Date,
      default: Date.now
    },
    stateTree: [
      {
        image: [{ type: String }],
        quantity: { type: String },
        description: { type: String }
      }
    ],
    purchasehistory: [
      { type: SchemaTypes.ObjectId, ref: 'PurchaseHistoryModel' }
    ]
  },
  {
    timestamps: true
  })

Tree.plugin(autoIncrement.plugin, { model: 'TreeModel', field: 'id' })

var TreeModel = mongoose.model('TreeModel', Tree)

TreeModel.createIndexes()

module.exports = TreeModel
