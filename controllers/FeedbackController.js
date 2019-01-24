import Feedback from '../models/feedback'
import Purchase from '../models/purchase.history'
import ErrorCode from '../constants/ErrorCode'

class FeedbackController {
  createFeedbackByTxId (_id, data) {
    return new Promise((resolve, reject) => {
      if (!data.comment && !data.rating) {
        let response = ErrorCode.MISSING_FIELD
        response.status = 200
        return reject(response)
      }
      Purchase.findOne({ _id: _id }, (error, purchase) => {
        if (error || !purchase) {
          let response = ErrorCode.DO_NOT_ORDER
          response.status = 200
          return reject(response)
        }
        let feedback = {
          transactionId: purchase._id,
          comment: data.comment,
          rating: data.rating
        }
        Feedback.create(feedback, (_error, _feedback) => {
          if (_error || !_feedback) {
            let response = ErrorCode.DB_ERROR
            response.status = 200
            return reject(response)
          }
          resolve(_feedback)
        })
      })
    }
    )
  }

  getFeedbackByUserId (_id, data) {
    return new Promise((resolve, reject) => {
      Feedback.find({ _id }, (_error, _feedback) => {
        if (_error || !_feedback) {
          let response = ErrorCode.DB_ERROR
          response.status = 200
          return reject(response)
        }
        resolve(_feedback)
      })
    })
  }
}

export default new FeedbackController()
