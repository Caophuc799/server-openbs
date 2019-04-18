import express from 'express'
import _ from 'lodash'
import FarmerController from '../../controllers/FarmersController'

const router = express.Router()


/* GET ALL cooperatives */

router.get('/', (req, res, next) => {
  FarmerController.getAll({}, req.query)
    .then(farmers => res.json({ success: true, data: farmers }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})

/* GET SINGLE cooperative BY ID */
router.get('/:id', (req, res, next) => {
  FarmerController.getOne(req.params.id)
    .then(cooperative => res.json({ success: true, data: cooperative }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})

router.post('/login', (req, res, next) => {
  FarmerController.login(req.body)
    .then(farmers => res.json({ success: true, data: farmers }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})

/* Create cooperative */
router.post('/', (req, res, next) => {
  FarmerController.create(req.body)
    .then(farmers => res.json({ success: true, data: farmers }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})
/* UPDATE cooperative */
router.put('/:id', (req, res, next) => {
  FarmerController.update(req.params.id, req.body)
    .then(farmers => res.json({ success: true, data: farmers }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})

/* DELETE cooperative */
router.delete('/:id', (req, res, next) => {
  FarmerController.delete(req.params.id, req.body)
    .then(farmers => res.json({ success: true, data: {} }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})
// /* GET orders of cooperative BY ID */
// router.get('/:id/orders', (req, res, next) => {
//   PurchaseHistory.getOrdersByCooperativeId(req.params.id, req.query)
//     .then(cooperative => {
//       res.json({ success: true, data: cooperative })
//     })
//     .catch(_error => {
//       let status = 500
//       if (_error.status) {
//         status = _error.status
//         delete _error.status
//       }
//       let response = { success: false, data: {} }
//       return res.json(status, _.merge(response, _error))
//     })
// })

/* GET tree of farm BY ID */
router.get('/:id/trees', (req, res, next) => {
  FarmerController.getTreeById(req.params.id, req.query)
    .then(cooperative => res.json({ success: true, data: cooperative }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})


export default router
