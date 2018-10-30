var ProductModel = require('../models/product')

function getProduct (query) {
  return ProductModel.findOne({ blockchainId: parseInt(query.id) }, null, { sort: 'startTime' }).then(result => {
    // res.send(items)
    return result
  })
}
function createProduct (data) {
  return ProductModel.findOne({ blockchainId: parseInt(data.blockchainId) }, null, { sort: 'startTime' })
    .then(_product => {
      if (_product) return { message: 'Product was Inserted' }
      return ProductModel.create({
        name: data.name,
        category: data.category,
        ipfsImageHash: data.imageLink,
        ipfsDescHash: data.descLink,
        startTime: data.startTime,
        price: data.price,
        productCondition: data.productCondition,
        buyer: data.buyer || null,
        blockchainId: data.blockchainId,
        seller: data.seller,
        transactionHash: data.transactionHash,
        escrowHash: null,
        comment: null,
        rating: null,
        oldBuy: []
      }).then(result => {
        // res.send(items)
        return result
      })
    })
}
function updateProduct (id, data) {
  return ProductModel.findOne({ blockchainId: parseInt(id) }, null, { sort: 'startTime' })
    .then(_product =>
      ProductModel.updateOne({ blockchainId: id }, {
        name: data.name || _product.name,
        category: data.category || _product.category,
        ipfsImageHash: data.ipfsImageHash || _product.ipfsImageHash,
        ipfsDescHash: data.ipfsDescHash || _product.ipfsDescHash,
        startTime: data.startTime || _product.startTime,
        price: data.price || _product.price,
        productCondition: data.productCondition || _product.productCondition,
        buyer: data.buyer || _product.buyer,
        comment: data.comment || _product.comment,
        rating: data.rating || _product.rating,
        escrowHash: data.escrowHash || _product.escrowHash
      }).then(result => {
        // res.send(items)
        return result
      })
    )
}
function buyProduct (id, data) {
  return ProductModel.findOne({ blockchainId: parseInt(id) }, null, { sort: 'startTime' })
    .then(_product => {
      if (!_product) return {}
      return ProductModel.updateOne({ blockchainId: parseInt(id) }, {
        buyer: data.buyer,
        escrowHash: data.escrowHash
      }).then(result => {
        // res.send(items)
        return result
      })
    })
}

function reviewProduct (id, data) {
  return ProductModel.findOne({ blockchainId: parseInt(id) }, null, { sort: 'startTime' })
    .then(_product => {
      if (!_product) return {}
      return ProductModel.updateOne({ blockchainId: id }, {
        comment: data.comment,
        rating: data.rating
      }).then(result => {
        // res.send(items)
        return result
      })
    })
}

function cancelBuyProduct (id) {
  console.log(id)
  return ProductModel.findOne({ blockchainId: parseInt(id) }, null, { sort: 'startTime' })
    .then(_product => {
      if (!_product) return {}
      return ProductModel.updateOne({ blockchainId: id },
        { buyer: null,
          comment: null,
          rating: null,
          escrowHash: null,
          $push: { oldBuy: {
            oldEscrowHash: _product.escrowHash,
            oldBuyer: _product.buyer,
            oldComment: _product.comment,
            oldRating: _product.rating
          } } }).then(result => {
        // res.send(items)
        return result
      })
    }
    )
}

function getAllProduct (query) {
  ProductModel.createIndexes({ name: 'text', category: 'text' }).then(console.log)
  return ProductModel.find(query, null, { sort: 'startTime' }).then(result => {
    // res.send(items)
    return result
  })
}

function getProductToBuy (query) {
  ProductModel.createIndexes({ name: 'text', category: 'text' }).then(console.log)
  return ProductModel.find(query, null, { sort: 'startTime' }).then(result => {
    // res.send(items)
    return result
  })
}

function getProductPurchased (query) {
  ProductModel.createIndexes({ name: 'text', category: 'text' }).then(console.log)
  return ProductModel.find(query, null, { sort: 'startTime' }).then(result => {
    // res.send(items)
    return result
  })
}

function getProductSelled (query) {
  ProductModel.createIndexes({ name: 'text', category: 'text' }).then(console.log)
  return ProductModel.find(query, null, { sort: 'startTime' }).then(result => {
    // res.send(items)
    return result
  })
}

const productController = {
  getProductPurchased,
  getProductToBuy,
  getAllProduct,
  getProduct,
  updateProduct,
  createProduct,
  buyProduct,
  reviewProduct,
  cancelBuyProduct,
  getProductSelled
}
module.exports = productController
