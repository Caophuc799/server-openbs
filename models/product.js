var mongoose = require('mongoose')

mongoose.Promise = global.Promise

var Schema = mongoose.Schema

var ProductSchema = new Schema({
  blockchainId: Number,
  name: String,
  category: String,
  ipfsImageHash: String,
  ipfsDescHash: String,
  startTime: Number,
  price: Number,
  productCondition: Number,
  seller: String,
  buyer: String,
  comment: String,
  rating: Number,
  transactionHash: String,
  escrowHash: String,
  oldBuy: [{
    oldEscrowHash: String,
    oldBuyer: String,
    oldComment: String,
    oldRating: Number
  }]
})

ProductSchema.index({ name: 2, category: 3 })

var ProductModel = mongoose.model('ProductModel', ProductSchema)

module.exports = ProductModel
