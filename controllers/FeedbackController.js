import Mangotree from '../models/tree'
import User from '../models/user'
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
          comment: data.comment,
          rating: data.rating
        }
        let expression = {
          '$push': { feedback: feedback }
        }
        purchase.update(expression, (_error, result) => {
          if (!_error && result) {
            resolve(result)
          } else {
            let response = ErrorCode.DB_ERROR
            response.status = 200
            return reject(response)
          }
        })
      })
    }
    )
  }

  getFeedbackByUserId (_id) {
    return new Promise((resolve, reject) => {
      User.findOne({ _id }).then(user => {
        if (user) {
          return Purchase.find({ buyerId: _id })
            .exec((_error, purchase) => {
              if (_error || !purchase) {
                let error = ErrorCode.DO_NOT_ORDER
                error.status = 404
                reject(error)
              }
              resolve(purchase)
            })
        }
        let response = ErrorCode.USER_DOES_NOT_EXIST
        response.status = 200
        return reject(response)
      })
    })
  }

  getFeedbackByTreeId (_treeId) {
    return new Promise((resolve, reject) => {
      Mangotree.findOne({ _id: _treeId })
        .then(mangotree => {
          if (!mangotree) {
            let response = ErrorCode.MANGOTREE_DOES_NOT_EXIST
            response.status = 200
            return reject(response)
          } else {
            Purchase.find({ treeId: _treeId })
              .exec((_error, purchase) => {
                if (_error || !purchase) {
                  let error = ErrorCode.DO_NOT_ORDER
                  error.status = 404
                  reject(error)
                }
                resolve(purchase)
              })
          }
        })
    })
  }
}

export default new FeedbackController()
