import Express from 'express'
import FeedbackController from '../../controllers/FeedbackController'
import _ from 'lodash'
var router = Express.Router()

router.post('/:transactionId', function (req, res) {
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

router.get('/', function (req, res) {
  FeedbackController.getFeedbackByUserId(req.params.id)
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
