/*
Define
status === 0 huy don hang
status === 1 dang cho thanh toan
status === 2 da thanh toan
*/
var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types

var PurchaseHistory = new Schema(
  {
    status: {
      type: Number,
      default: 1
    },
    buyerId: {
      type: SchemaTypes.ObjectId,
      ref: 'UserModel',
      required: true
    },
    treeId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'TreeModel'
    },
    startTime: {
      type: Date,
      default: Date.now
    },
    endTime: {
      type: Date
    },
    tx: {
      type: String,
      default: ''
    },
    stateTree: {
      image: [{ type: String,
        default: '' }],
      quantity: { type: String,
        default: '' },
      description: { type: String,
        default: '' }
    },
    feedback: [
      {
        comment: {
          type: SchemaTypes.String,
          default: ''
        },
        rating: {
          type: SchemaTypes.String,
          default: ''
        },
        tx: {
          type: String,
          default: ''
        },
        time: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true
  })

var PurchaseHistoryModel = mongoose.model('PurchaseHistoryModel', PurchaseHistory)

module.exports = PurchaseHistoryModel
