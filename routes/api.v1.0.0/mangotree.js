import express from 'express'
import _ from 'lodash'
import MangoTreesController from '../../controllers/MangoTreesController'
import FeedbackController from '../../controllers/FeedbackController';

var { verifyToken } = require('../../services/VerifyToken')
const router = express.Router()

// router.use(verifyToken)
/* GET ALL mangos */
router.get('/', (req, res, next) => {
  MangoTreesController.getAll(req.query || {})
    .then(mangos => res.json({ success: true, data: mangos }))
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

/* GET ALL mangos */
router.get('/buyed', (req, res, next) => {
  MangoTreesController.getAllBuyed(req.query || {})
    .then(mangos => res.json({ success: true, data: mangos }))
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

/* SAVE mango */
router.post('/', (req, res, next) => {
  MangoTreesController.create(req.body)
    .then(mango => {
      return res.json({ success: true, data: mango })
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

/* GET SINGLE mango BY ID */
router.get('/:id', (req, res, next) => {
  MangoTreesController.getOne(req.params.id)
    .then(mango => res.json({ success: true, data: mango }))
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

/* UPDATE mango */
router.put('/:id', (req, res, next) => {
  MangoTreesController.update(req.params.id, req.body)
    .then(mango => res.json({ success: true, data: mango }))
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

/* UPDATE state tree */
router.put('/:id/stateTree', (req, res, next) => {
  MangoTreesController.updateStateTree(req.params.id, req.body)
    .then(mango => res.json({ success: true, data: mango }))
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
/* DELETE mango */
router.delete('/:id', (req, res, next) => {
  MangoTreesController.delete(req.params.id, req.body)
    .then(mango => res.json({ success: true, data: {} }))
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

/* BUY mango */
router.post('/:id/buy', (req, res, next) => {
  MangoTreesController.buyMangoTree(req.params.id, req.body)
    .then(mango => res.json({ success: true, data: mango }))
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

router.get('/:treeId/feedbacks', function (req, res) {
  FeedbackController.getFeedbackByTreeId(req.params.treeId)
    .then(feedback => res.json({ success: true, data: feedback }))
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
