import Mangotree from '../models/tree'
import Cooperative from '../models/cooperative'
import PurchaseHistory from '../models/purchase.history'
import User from '../models/user'
import _ from 'lodash'
import moment from 'moment'
import ErrorCode from '../constants/ErrorCode'
import ModelName from '../constants/ModelName'
import fs from 'fs'
import path from 'path'
class MangoTreesController {
  getAll (query, projection) {
    let options
    if (query && query.offset && query.limit) {
      options = {
        skip: parseInt(query.offset * query.limit),
        limit: parseInt(query.limit)
      }
    }
    return new Promise((resolve, reject) => {
      Mangotree.find({}, projection, options)
        .sort({ createdAt: 'desc' })
        .populate({ path: 'cooperativeId', model: ModelName.CooperativeModel })
        .populate({ path: 'purchasehistory', model: ModelName.PurchaseHistoryModel })
        .then(mangotrees => {
          mangotrees = mangotrees.filter(item => {
            let purchasehistory = item.purchasehistory
            purchasehistory = purchasehistory.sort((a, b) => {
              if (a && moment(a.createdAt).isValid() && b && moment(b.createdAt).isValid() &&
                moment(a.createdAt).isAfter(b.createdAt)) {
                return -1
              }
              return 1
            })
            let temppurchase = purchasehistory[purchasehistory.length - 1]
            return !(temppurchase && moment().isBefore(temppurchase.endTime) && temppurchase.status !== 0)
          })
          resolve(mangotrees)
        })
        .catch(error => reject(error))
    })
  }

  getAllBuyed (query, projection, options) {
    let curQuery = {}
    if (query && query.idCooperative) {
      curQuery.idCooperative = query.idCooperative
    }
    curQuery.idBuyer = { $ne: null }
    return new Promise((resolve, reject) => {
      Mangotree.find(curQuery, projection, options)
        .populate({ path: 'purchasehistory', model: ModelName.PurchaseHistoryModel })
        .then(mangotrees => resolve(mangotrees))
        .catch(error => reject(error))
    })
  }

  getOne (_id, projection, options) {
    return new Promise((resolve, reject) => {
      Mangotree.findOne({ _id }, projection, options)
        .populate({ path: 'purchasehistory', model: ModelName.PurchaseHistoryModel })
        .then(mangotrees => {
          if (mangotrees) {
            return Cooperative.findOne({ _id: mangotrees.cooperativeId }).then(cooperative => {
              let result = Object.assign({}, mangotrees._doc)
              result.cooperative = cooperative
              return resolve(result)
            }).catch(error => {
              reject(error)
            })
          } else {
            let error = ErrorCode.CAN_NOT_FIND_MANGOTREE
            error.status = 404
            reject(error)
          }
        }).catch(error => {
          if (error.kind === 'ObjectId') {
            let response = ErrorCode.INVALID_ID
            response.status = 200
            return reject(response)
          }
          reject(error)
        })
    })
  }

  create (_mangotree, files) {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(_mangotree)) {
        let response = ErrorCode.DATA_DOES_NOT_NULL
        response.status = 200
        return reject(response)
      }
      if (!_mangotree.numberId) {
        let response = ErrorCode.MISSING_IDTREE
        response.status = 200
        return reject(response)
      }
      if (!_mangotree.name) {
        let response = ErrorCode.MISSING_NAME
        response.status = 200
        return reject(response)
      }
      if (!_mangotree.category) {
        let response = ErrorCode.MISSING_CATEGORY
        response.status = 200
        return reject(response)
      }
      if (!_mangotree.timeStartPlant) {
        let response = ErrorCode.MISSING_TIMESTAMP
        response.status = 200
        return reject(response)
      }
      if (!moment(_mangotree.timeStartPlant, 'MM/DD/YYYY', true).isValid()) {
        let response = ErrorCode.INVALID_TIMESTAMP
        response.status = 200
        return reject(response)
      }
      if (!_mangotree.cooperativeId) {
        let response = ErrorCode.MISSING_IDCOOPERATIVE
        response.status = 200
        return reject(response)
      }
      if (!_mangotree.price || (parseFloat(_mangotree.price) <= 0)) {
        let response = ErrorCode.PRICE_MUST_BE_THAN_ZERO
        response.status = 200
        return reject(response)
      }
      if (isNaN(_mangotree.durationSelling) || parseFloat(_mangotree.durationSelling) <= 0) {
        let response = ErrorCode.DURATION_MUST_BE_NUMBER
        response.status = 200
        return reject(response)
      }
      return Cooperative.findById({ _id: _mangotree.cooperativeId }, async (_error, _cooperative) => {
        if (_cooperative && !_.isEmpty(_cooperative) && !_error) {
          let stateTree = []
          for (let state of _mangotree.stateTree || []) {
            let newState = { quantity: state.quantity, description: state.description }
            let images = []
            for (let image of state.image) {
              let data = await fs.readFileSync(image)
              images.push({ data, contentType: 'image/png' })
            }
            newState.image = images
            stateTree.push(newState)
          }
          const currentMangotree = {
            name: _mangotree.name,
            numberId: _mangotree.numberId,
            cooperativeId: _cooperative._id,
            address: _mangotree.address,
            location: _mangotree.location,
            category: _mangotree.category,
            price: _mangotree.price,
            stateTree: stateTree,
            purchasehistory: [],
            timeStartPlant: _mangotree.timeStartPlant,
            durationSelling: _mangotree.durationSelling,
            summary: _mangotree.summary
          }
          return Mangotree.create(currentMangotree)
            .then(mangotree => {
              if (mangotree) {
                let expression = {
                  '$push': { treeIds: mangotree }
                }
                _cooperative.update(expression, (_error, result) => {
                  if (result) {
                    resolve(mangotree)
                  }
                })
              }
            })
            .catch(error => {
              console.log(error)
              if (error && error.code === 11000 && error.errmsg.includes('duplicate')) {
                let response = ErrorCode.MANGOTREE_EXIST
                response.status = 200
                return reject(response)
              }
              return reject(error)
            })
        } else {
          let response = ErrorCode.CANT_NOT_FIND_COOPERATIVE
          response.status = 200
          return reject(response)
        }
      })
    })
  }

  update (_id, _mangotree) {
    return new Promise((resolve, reject) => {
      if (_mangotree.idCooperative) {
        let response = ErrorCode.CAN_NOT_UPDATE_COOPERATIVE
        response.status = 200
        return reject(response)
      }
      if (!_.isEmpty(_mangotree.price) && parseFloat(_mangotree.price) <= 0) {
        let response = ErrorCode.PRICE_MUST_BE_THAN_ZERO
        response.status = 200
        return reject(response)
      }
      if (isNaN(_mangotree.durationSelling) || parseFloat(_mangotree.durationSelling) <= 0) {
        let response = ErrorCode.DURATION_MUST_BE_NUMBER
        response.status = 200
        return reject(response)
      }
      const currentMangotree = {
        name: _mangotree.name,
        address: _mangotree.address,
        location: _mangotree.location,
        category: _mangotree.category,
        price: _mangotree.price,
        timeStartPlant: _mangotree.timeStartPlant,
        durationSelling: _mangotree.durationSelling,
        summary: _mangotree.summary
      }
      let expression = currentMangotree
      if (_mangotree.stateTree) {
        expression['$push'] = {
          stateTree: _mangotree.stateTree
        }
      }
      return Mangotree.findOneAndUpdate({ _id }, expression)
        .then(mangotree => {
          if (mangotree) {
            resolve(mangotree)
          } else {
            let response = ErrorCode.MANGOTREE_DOES_NOT_EXIST
            response.status = 200
            return reject(response)
          }
        })
        .catch(error => {
          console.log(error)
          if (error.kind === 'ObjectId') {
            let response = ErrorCode.INVALID_ID
            response.status = 200
            return reject(response)
          }
          reject(error)
        })
    })
  }

  updateStateTree (_id, _mangotree) {
    return new Promise((resolve, reject) => {
      if (!_mangotree.image && !_mangotree.quantity && !_mangotree.description) {
        let response = ErrorCode.MISSING_FIELD
        response.status = 200
        return reject(response)
      }
      let images = []
      for (let image of _mangotree.image) {
        let data = fs.readFileSync(image)
        images.push({ data, contentType: 'image/png' })
      }
      let expression = {}
      expression['$push'] = {
        stateTree: {
          image: images,
          quantity: _mangotree.quantity,
          description: _mangotree.description
        }
      }
      return Mangotree.findOneAndUpdate({ _id }, expression)
        .then(mangotree => {
          if (mangotree) {
            resolve(mangotree)
          } else {
            let response = ErrorCode.MANGOTREE_DOES_NOT_EXIST
            response.status = 200
            return reject(response)
          }
        })
        .catch(error => {
          console.log(error)
          if (error.kind === 'ObjectId') {
            let response = ErrorCode.INVALID_ID
            response.status = 200
            return reject(response)
          }
          reject(error)
        })
    })
  }

  delete (_id) {
    return new Promise((resolve, reject) => {
      Mangotree.deleteOne({ _id })
        .then(mangotree => {
          resolve(mangotree)
        }).catch(error => {
          if (error.kind === 'ObjectId') {
            let response = ErrorCode.INVALID_ID
            response.status = 200
            return reject(response)
          }
          reject(error)
        })
    })
  }

  buyMangoTree (_id, data) {
    return new Promise((resolve, reject) => {
      if (!data.buyerId) {
        let response = ErrorCode.MISSING_FIELD
        response.status = 200
        return reject(response)
      }
      Mangotree.findOne({ _id })
        .populate({ path: 'purchasehistory', model: ModelName.PurchaseHistoryModel })
        .exec((_error, mangotree) => {
          if (mangotree && !_error) {
            let purchasehistory = mangotree.purchasehistory
            purchasehistory = purchasehistory.sort((a, b) => {
              if (a && moment(a.createdAt).isValid() && b && moment(b.createdAt).isValid() &&
                moment(a.createdAt).isAfter(b.createdAt)) {
                return -1
              }
              return 1
            })
            let temppurchase = purchasehistory[purchasehistory.length - 1]
            if (temppurchase && moment().isBefore(temppurchase.endTime) && temppurchase.status !== 0) {
              let response = ErrorCode.TREE_BOUGHT
              response.status = 200
              return reject(response)
            }
            User.findOne({ _id: data.buyerId }).then(user => {
              if (user) {
                let purchase = {
                  buyerId: user._id,
                  treeId: mangotree._id,
                  stateTree: mangotree.stateTree[mangotree.stateTree.length - 1],
                  endTime: moment().format('DD/MM/YYYY'),
                  startTime: moment().add(mangotree.durationSelling, 'months').format('DD/MM/YYYY')
                }
                PurchaseHistory.create(purchase, (_error, _purchase) => {
                  if (_purchase && !_error) {
                    let expression = {
                      status: 1,
                      '$push': { purchasehistory: _purchase }
                    }
                    mangotree.update(expression, (_error, result) => {
                      if (result) {
                        resolve(_purchase)
                      }
                    })
                  } else {
                    let response = ErrorCode.FAIL
                    response.status = 200
                    return reject(response)
                  }
                })
              } else {
                let response = ErrorCode.USER_DOES_NOT_EXIST
                response.status = 200
                return reject(response)
              }
            }).catch(_error => {
              let response = ErrorCode.INVALID_ID
              response.status = 200
              return reject(response)
            })
          } else {
            let response = ErrorCode.MANGOTREE_DOES_NOT_EXIST
            response.status = 200
            return reject(response)
          }
        })
    })
  }
}

export default new MangoTreesController()
