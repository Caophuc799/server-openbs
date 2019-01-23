import Mangotree from '../models/tree'
import Cooperative from '../models/cooperative'
import User from '../models/user'
import _ from 'lodash'
import moment from 'moment'
import ErrorCode from '../constants/ErrorCode'

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
        .then(mangotrees => resolve(mangotrees))
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
        .then(mangotrees => resolve(mangotrees))
        .catch(error => reject(error))
    })
  }

  getOne (_id, projection, options) {
    return new Promise((resolve, reject) => {
      Mangotree.findOne({ _id }, projection, options)
        .then(mangotrees => {
          if (mangotrees) {
            return Cooperative.findOne({ _id: mangotrees.idCooperative }).then(cooperative => {
              mangotrees.cooperative = cooperative
              return resolve(mangotrees)
            }).catch(error => {
              reject(error)
            })
          } else {
            let error = ErrorCode.CAN_NOT_FIND_MANGOTREE
            error.status = 404
            reject(error)
          }
        }).catch(error => {
          if (error.kind == 'ObjectId') {
            let response = ErrorCode.INVALID_ID
            response.status = 200
            return reject(response)
          }
          reject(error)
        })
    })
  }

  create (_mangotree) {
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
      return Cooperative.findById({ _id: _mangotree.cooperativeId })
        .then(_cooperative => {
          if (_cooperative && !_.isEmpty(_cooperative)) {
            const currentMangotree = {
              name: _mangotree.name,
              numberId: _mangotree.numberId,
              cooperativeId: _cooperative._id,
              address: _mangotree.address,
              location: _mangotree.location,
              category: _mangotree.category,
              price: _mangotree.price,
              stateTree: _mangotree.stateTree,
              purchasehistory: [],
              timeStartPlant: _mangotree.timeStartPlant
            }
            return Mangotree.create(currentMangotree)
              .then(mangotree => {
                resolve(mangotree)
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
        }).catch(error => {
          console.log(error)
          let response = ErrorCode.CANT_NOT_FIND_COOPERATIVE
          response.status = 200
          return reject(response)
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
      const currentMangotree = {
        name: _mangotree.name,
        address: _mangotree.address,
        location: _mangotree.location,
        category: _mangotree.category,
        price: _mangotree.price,
        timeStartPlant: _mangotree.timeStartPlant
      }
      return Mangotree.findOneAndUpdate({ _id }, currentMangotree)
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
      if (!_mangotree.image || !_mangotree.quantity || !_mangotree.description) {
        let response = ErrorCode.MISSING_FIELD
        response.status = 200
        return reject(response)
      }
      let expression = {}
      expression['$push'] = {
        stateTree: {
          image: _mangotree.image,
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
      Mangotree.findOne({ _id })
        .then(mangotree => {
          if (mangotree) {
            resolve(mangotree)
          } else {
            let response = ErrorCode.MANGOTREE_DOES_NOT_EXIST
            response.status = 200
            return reject(response)
          }
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export default new MangoTreesController()
