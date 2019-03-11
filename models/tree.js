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
    durationSelling: {
      type: Number,
      default: 12
    },
    summary: { type: String, default: '' },
    stateTree: [
      {
        image: [{ data: Buffer, contentType: String }],
        quantity: { type: String },
        description: { type: String },
        time: { type: Date, default: Date.now }
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
