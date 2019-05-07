import express from 'express'
import _ from 'lodash'
import CooperativesController from '../../controllers/CooperativesController'
import PurchaseHistory from '../../controllers/PurchaseHistory'

const router = express.Router()

/* GET ALL cooperatives */
router.get('/', (req, res, next) => {
  CooperativesController.getAll({}, req.query)
    .then(cooperatives => res.json({ success: true, data: cooperatives }))
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
  CooperativesController.getOne(req.params.id)
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

/* GET orders of cooperative BY ID */
router.get('/:id/orders', (req, res, next) => {
  PurchaseHistory.getOrdersByCooperativeId(req.params.id, req.query)
    .then(cooperative => {
      res.json({ success: true, data: cooperative })
    })
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

/* GET tree of cooperative BY ID */
router.get('/:id/trees', (req, res, next) => {
  PurchaseHistory.getTreeByCooperativeId(req.params.id, req.query)
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

/* GET tree of cooperative BY ID */
router.get('/:id/buyers', (req, res, next) => {
  PurchaseHistory.getBuyerOfCooperative(req.params.id, req.query)
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

/* UPDATE cooperative */
router.put('/:id', (req, res, next) => {
  CooperativesController.update(req.params.id, req.body, req.files)
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

/* DELETE cooperative */
router.delete('/:id', (req, res, next) => {
  CooperativesController.delete(req.params.id, req.body)
    .then(cooperative => res.json({ success: true, data: {} }))
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

/* GET ALL cooperatives */
router.get('/:id/statistics', (req, res, next) => {
  CooperativesController.getStatistics(req.params.id, req.query)
    .then(cooperatives => res.json({ success: true, data: cooperatives }))
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
