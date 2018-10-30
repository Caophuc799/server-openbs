
var ProductController = require('../controllers/ProductController')
const constArbiter = require('../constants/constant').constArbiter

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!'
  }))
  app.get('/api/products/:id', function (req, res) {
    ProductController.getProduct(req.params).then((result) => {
      // console.log(result)
      if (result) {
        res.send({ success: true, data: result })
      } else {
        res.send({ error: true, result })
      }
    })
  })
  app.put('/api/products/:id', function (req, res) {
    ProductController.updateProduct(req.params.id, req.body).then((result) => {
      // console.log(result)
      if (result) {
        res.send({ success: true, data: result })
      } else {
        res.send({ error: true, result })
      }
    })
  })
  app.put('/api/buyProducts/:id', function (req, res) {
    ProductController.buyProduct(req.params.id, req.body).then((result) => {
      // console.log(result)
      if (result) {
        res.send({ success: true, data: result })
      } else {
        res.send({ error: true, result })
      }
    })
  })
  app.put('/api/reviewProducts/:id', function (req, res) {
    ProductController.reviewProduct(req.params.id, req.body).then((result) => {
      if (result) {
        res.send({ success: true, data: result })
      } else {
        res.send({ error: true, result })
      }
    })
  })
  app.put('/api/cancelBuyProduct/:id', function (req, res) {
    ProductController.cancelBuyProduct(req.params.id).then((result) => {
      // console.log(result)
      if (result) {
        res.send({ success: true, data: result })
      } else {
        res.send({ error: true, result })
      }
    })
  })
  app.post('/api/products', function (req, res) {
    ProductController.createProduct(req.body).then((result) => {
      // console.log(result)
      if (result) {
        res.send({ success: true, data: result })
      } else {
        res.send({ error: true, result })
      }
    })
  })
  app.get('/api/products', function (req, res) {
    // res.send('hello')
    var query = {}
    if (req.query.category !== undefined) {
      query['category'] = { $eq: req.query.category }
    }
    if (req.query.q !== undefined && req.query.q) {
      query.$text = { $search: req.query.q }
    }
    if (req.query.productCondition !== undefined) {
      query.productCondition = parseInt(req.query.productCondition)
    }
    ProductController.getAllProduct(query).then((result) => {
      // console.log(result)
      if (result) {
        res.send({ success: true, data: result })
      } else {
        res.send({ error: true, result })
      }
    })
  })
  app.get('/api/productpurchased', function (req, res) {
    // res.send('hello')
    var query = {}
    if (req.query.category !== undefined) {
      query['category'] = { $eq: req.query.category }
    }
    if (req.query.q !== undefined && req.query.q) {
      query.$text = { $search: req.query.q }
    }
    if (req.query.productCondition !== undefined) {
      query.productCondition = parseInt(req.query.productCondition)
    }
    query['buyer'] = req.query.buyer
    if (req.query.buyer === constArbiter) {
      query['buyer'] = { $ne: null }
    }
    if (!req.query.buyer || req.query.buyer === undefined) {
      return res.send({ success: true, data: [] })
    }
    ProductController.getAllProduct(query).then((result) => {
      // console.log(result)
      if (result) {
        res.send({ success: true, data: result })
      } else {
        res.send({ error: true, result })
      }
    })
  })
  app.get('/api/producttobuy', function (req, res) {
    // res.send('hello')
    var query = {}
    if (req.query.category !== undefined) {
      query['category'] = { $eq: req.query.category }
    }
    if (req.query.q !== undefined && req.query.q) {
      query.$text = { $search: req.query.q }
    }
    if (req.query.productCondition !== undefined) {
      query.productCondition = parseInt(req.query.productCondition)
    }
    query['buyer'] = null
    ProductController.getProductToBuy(query).then((result) => {
      // console.log(result)
      if (result) {
        res.send({ success: true, data: result })
      } else {
        res.send({ error: true, result })
      }
    })
  })
  app.get('/api/productSelled', function (req, res) {
    // res.send('hello')
    var query = {}
    if (req.query.category !== undefined) {
      query['category'] = { $eq: req.query.category }
    }
    if (req.query.q !== undefined && req.query.q) {
      query.$text = { $search: req.query.q }
    }
    if (req.query.productCondition !== undefined) {
      query.productCondition = parseInt(req.query.productCondition)
    }
    query['seller'] = req.query.seller
    if (!req.query.seller || req.query.seller === undefined) {
      return res.send({ success: true, data: [] })
    }
    ProductController.getProductSelled(query).then((result) => {
      // console.log(result)
      if (result) {
        res.send({ success: true, data: result })
      } else {
        res.send({ error: true, result })
      }
    })
  })
  // Tìm bất cứ thứ gì. không bộ lọc. sort time ngày
  // ProductModel.find({}, null, { sort: 'startTime' }, function (err, items) {
  //   res.send(items)
  // })
}
