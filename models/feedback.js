var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types

var Feedback = new Schema(
  {
    transactionId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'PurchaseHistoryModel'
    },
    comment: {
      type: SchemaTypes.String,
      default: ''
    },
    rating: {
      type: SchemaTypes.String,
      default: ''
    }
  }, {
    timestamps: true
  })

var FeedbackModel = mongoose.model('FeedbackModel', Feedback)

module.exports = FeedbackModel
