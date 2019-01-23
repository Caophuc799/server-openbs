var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types

var PurchaseHistory = new Schema(
  {
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
    time: {
      type: Date,
      default: Date.now
    },
    stateTree: {
      image: [{ type: String,
        default: '' }],
      quantity: { type: String,
        default: '' },
      description: { type: String,
        default: '' }
    }
  },
  {
    timestamps: true
  })

var PurchaseHistoryModel = mongoose.model('PurchaseHistoryModel', PurchaseHistory)

module.exports = PurchaseHistoryModel
