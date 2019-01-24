import Purchase from '../models/purchase.history'
import User from '../models/user'
import Cooperative from '../models/cooperative'
import Tree from '../models/tree'
import ErrorCode from '../constants/ErrorCode'
import ModelName from '../constants/ModelName'
import _ from 'lodash'
var mongoose = require('mongoose')
class PurchaseHistory {
  getOrdersByUserId (_id, data) {
    return new Promise((resolve, reject) => {
      User.findOne({ _id }).then(user => {
        if (user) {
          let projection = {}
          let options
          if (data.limit && data.offset) {
            options = {
              skip: parseInt(data.offset * data.limit),
              limit: parseInt(data.limit)
            }
          }
          Purchase.find({ buyerId: user._id }, projection, options)
            .populate({ path: 'treeId', populate: { path: 'cooperativeId' } }).populate('buyerId')
            .then(orders => {
              resolve(orders)
            })
            .catch(error => reject(error))
        } else {
          let error = ErrorCode.USER_DOES_NOT_EXIST
          error.status = 404
          reject(error)
        }
      }).catch(_error => {
        console.log(_error)
        let error = ErrorCode.USER_DOES_NOT_EXIST
        error.status = 404
        reject(error)
      })
    })
  }

  getOrdersByCooperativeId (_id, data) {
    return new Promise((resolve, reject) => {
      Cooperative.findOne({ _id }, (_error, cooperative) => {
        if (cooperative) {
          let projection = {}
          let options = {}
          if (data.limit && data.offset) {
            options = {
              skip: parseInt(data.offset * data.limit),
              limit: parseInt(data.limit)
            }
          }
          Purchase.find({}, projection, options)
            .populate({ path: 'treeId', populate: { path: 'cooperativeId', model: ModelName.CooperativeModel } })
            .populate('buyerId')
            .exec((_error, purchase) => {
              if (_error) reject(_error)
              if (purchase) {
                purchase = purchase.filter(item => {
                  _id = mongoose.Types.ObjectId(_id)
                  return _.isEqual(item.treeId.cooperativeId._id, _id)
                })
                resolve(purchase)
              }
            })
        } else {
          let error = ErrorCode.COOPERATIVE_DOES_NOT_EXIST
          error.status = 404
          reject(error)
        }
      })
    })
  }
}

export default new PurchaseHistory()
