import Purchase from '../models/purchase.history'
import User from '../models/user'
import Cooperative from '../models/cooperative'
import Tree from '../models/tree'
import ErrorCode from '../constants/ErrorCode'
import ModelName from '../constants/ModelName'
import _ from 'lodash'
import moment from 'moment'
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

  getTreeByUserId (_id, data) {
    return new Promise((resolve, reject) => {
      User.findOne({ _id }, (_error, user) => {
        if (_error || !user) {
          let error = ErrorCode.USER_DOES_NOT_EXIST
          error.status = 404
          reject(error)
        }
        let projection = {}
        let options
        if (data.limit && data.offset) {
          options = {
            skip: parseInt(data.offset * data.limit),
            limit: parseInt(data.limit)
          }
        }
        Purchase.find({ buyerId: _id }, projection, options)
          .populate('treeId')
          .exec((_error, purchase) => {
            if (_error || !purchase) {
              let error = ErrorCode.DO_NOT_ORDER
              error.status = 404
              reject(error)
            }
            purchase = purchase.map(item => item.treeId)
            purchase = purchase.sort((a, b) => {
              if (a && moment(a.createdAt).isValid() && b && moment(b.createdAt).isValid() &&
                moment(a.createdAt).isAfter(b.createdAt)) {
                return -1
              }
              return 1
            })
            resolve(purchase)
          })
      })
    })
  }

  getTreePurchasedByUserId (_id, data) {
    return new Promise((resolve, reject) => {
      User.findOne({ _id }, (_error, user) => {
        if (_error || !user) {
          let error = ErrorCode.USER_DOES_NOT_EXIST
          error.status = 404
          reject(error)
        }
        let projection = {}
        let options
        if (data.limit && data.offset) {
          options = {
            skip: parseInt(data.offset * data.limit),
            limit: parseInt(data.limit)
          }
        }
        Purchase.find({ buyerId: _id, status: 2 }, projection, options)
          .populate('treeId')
          .exec((_error, purchase) => {
            if (_error || !purchase) {
              let error = ErrorCode.DO_NOT_ORDER
              error.status = 404
              reject(error)
            }
            purchase = purchase.map(item => item.treeId)
            purchase = purchase.sort((a, b) => {
              if (a && moment(a.createdAt).isValid() && b && moment(b.createdAt).isValid() &&
                moment(a.createdAt).isAfter(b.createdAt)) {
                return -1
              }
              return 1
            })
            resolve(purchase)
          })
      })
    })
  }

  getTreePendingByUserId (_id, data) {
    return new Promise((resolve, reject) => {
      User.findOne({ _id }, (_error, user) => {
        if (_error || !user) {
          let error = ErrorCode.USER_DOES_NOT_EXIST
          error.status = 404
          reject(error)
        }
        let projection = {}
        let options
        if (data.limit && data.offset) {
          options = {
            skip: parseInt(data.offset * data.limit),
            limit: parseInt(data.limit)
          }
        }
        Purchase.find({ buyerId: _id, status: 1 }, projection, options)
          .populate('treeId')
          .exec((_error, purchase) => {
            if (_error || !purchase) {
              let error = ErrorCode.DO_NOT_ORDER
              error.status = 404
              reject(error)
            }
            purchase = purchase.map(item => item.treeId)
            purchase = purchase.sort((a, b) => {
              if (a && moment(a.createdAt).isValid() && b && moment(b.createdAt).isValid() &&
                moment(a.createdAt).isAfter(b.createdAt)) {
                return -1
              }
              return 1
            })
            resolve(purchase)
          })
      })
    })
  }

  getTreeCancelByUserId (_id, data) {
    return new Promise((resolve, reject) => {
      User.findOne({ _id }, (_error, user) => {
        if (_error || !user) {
          let error = ErrorCode.USER_DOES_NOT_EXIST
          error.status = 404
          reject(error)
        }
        let projection = {}
        let options
        if (data.limit && data.offset) {
          options = {
            skip: parseInt(data.offset * data.limit),
            limit: parseInt(data.limit)
          }
        }
        Purchase.find({ buyerId: _id, status: 0 }, projection, options)
          .populate('treeId')
          .exec((_error, purchase) => {
            if (_error || !purchase) {
              let error = ErrorCode.DO_NOT_ORDER
              error.status = 404
              reject(error)
            }
            purchase = purchase.map(item => item.treeId)
            purchase = purchase.sort((a, b) => {
              if (a && moment(a.createdAt).isValid() && b && moment(b.createdAt).isValid() &&
                moment(a.createdAt).isAfter(b.createdAt)) {
                return -1
              }
              return 1
            })
            resolve(purchase)
          })
      })
    })
  }

  getTreeByCooperativeId (_id, data) {
    return new Promise((resolve, reject) => {
      Cooperative.findOne({ _id }, (_error, cooperative) => {
        if (_error || !cooperative) {
          let error = ErrorCode.COOPERATIVE_DOES_NOT_EXIST
          error.status = 404
          reject(error)
        }
        let projection = {}
        let options
        if (data.limit && data.offset) {
          options = {
            skip: parseInt(data.offset * data.limit),
            limit: parseInt(data.limit)
          }
        }
        Tree.find({ cooperativeId: _id }, projection, options)
          .populate({ path: 'purchasehistory', model: ModelName.PurchaseHistoryModel })
          .exec((_error, tree) => {
            if (_error || !tree) {
              let error = ErrorCode.MANGOTREE_DOES_NOT_EXIST
              error.status = 404
              reject(error)
            }
            resolve(tree)
          })
      })
    })
  }

  confirmPayment (_id, data) {
    return new Promise((resolve, reject) => {
      Purchase.findOne({ _id }, (_error, purchase) => {
        if (_error || !purchase) {
          let error = ErrorCode.DO_NOT_ORDER
          error.status = 404
          reject(error)
        }
        let newPurchase = {
          status: 2
        }
        purchase.update(newPurchase, (error, result) => {
          if (error || !result) {
            let error = ErrorCode.FAIL
            error.status = 404
            reject(error)
          }
          purchase.status = 2
          resolve({})
        })
      })
    })
  }

  cancelPayment (_id, data) {
    return new Promise((resolve, reject) => {
      Purchase.findOne({ _id }, (_error, purchase) => {
        if (_error || !purchase) {
          let error = ErrorCode.DO_NOT_ORDER
          error.status = 404
          reject(error)
        }
        let newPurchase = {
          status: 0
        }
        purchase.update(newPurchase, (error, result) => {
          if (error || !result) {
            let error = ErrorCode.FAIL
            error.status = 404
            reject(error)
          }
          purchase.status = 2
          resolve({})
        })
      })
    })
  }
}

export default new PurchaseHistory()
