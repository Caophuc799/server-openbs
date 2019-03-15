import Express from 'express'
import FeedbackController from '../../controllers/FeedbackController'
import PurchaseHistoryController from '../../controllers/PurchaseHistory'
import _ from 'lodash'
var router = Express.Router()

router.get('/:transactionId/confirm', function (req, res) {
  PurchaseHistoryController.confirmPayment(req.params.transactionId, req.body)
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

router.get('/:transactionId/cancel', function (req, res) {
  PurchaseHistoryController.cancelPayment(req.params.transactionId, req.body)
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

router.post('/:transactionId/feedback/create', function (req, res) {
  FeedbackController.createFeedbackByTxId(req.params.transactionId, req.body)
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

router.get('/:userId/feedbacks', function (req, res) {
  FeedbackController.getFeedbackByUserId(req.params.userId)
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
