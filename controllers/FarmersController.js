import _ from 'lodash';
import cfg from '../config';
import errorCode from '../constants/ErrorCode';
import ModelName from '../constants/ModelName';
import Cooperative from '../models/cooperative';
import Farmer from '../models/farmer';
import Tree from '../models/tree';
const jwt = require('jsonwebtoken')

class FarmerController {
  getAll (projection, query = { offset: 0, limit: 0 }) {
    let options
    if (query) {
      options = {
        skip: parseInt(query.offset * query.limit),
        limit: parseInt(query.limit)
      }
    }
    if (query.cooperativeId) {
      return new Promise((resolve, reject) => {
        Farmer.find({ cooperativeId: query.cooperativeId }, projection, options)
          .then(farmers => resolve(farmers))
          .catch(error => reject(error))
      })
    }
    return new Promise((resolve, reject) => {
      Farmer.find({}, projection, options)
        .then(farmers => resolve(farmers))
        .catch(error => reject(error))
    })
  }

  getTreeById (id, query = { offset: 0, limit: 0 }) {
    return new Promise((resolve, reject) => {
      let options
      if (query) {
        options = {
          skip: parseInt(query.offset * query.limit),
          limit: parseInt(query.limit)
        }
      }
      console.log('hello')
      Farmer.findOne({ _id: id })
        .then(farm => {
          if (!farm) {
            let response = errorCode.CANT_NOT_FIND_FARMER
            response.status = 200
            return reject(response)
          }
          return Tree.find({ farmerId: id })
            .populate({ path: 'purchasehistory', model: ModelName.PurchaseHistoryModel })
            .then(trees => {
              return resolve(trees)
            })
            .catch(_error => {
              let response = errorCode.CAN_NOT_FIND_MANGOTREE
              response.status = 200
              return reject(response)
            })
        })
        .catch(_error => {
          let response = errorCode.CANT_NOT_FIND_FARMER
          response.status = 200
          return reject(response)
        })
    })
  }

  getOne (_id, projection, options) {
    return new Promise((resolve, reject) => {
      Farmer.findOne({ _id }, projection, options)
        .then(farmers => {
          if (farmers) {
            return resolve(farmers)
          } else {
            let error = errorCode.CANT_NOT_FIND_FARMER
            error.status = 404
            reject(error)
          }
        })
        .catch(error => {
          if (error.kind == 'ObjectId') {
            let response = errorCode.INVALID_ID
            response.status = 200
            return reject(response)
          }
          reject(error)
        })
    })
  }

  login (data) {
    return new Promise((resolve, reject) => {
      console.log('into _farmer', data)
      Farmer.findOne({ username: data.username, password: data.password }).then(_farmer => {
        if (_farmer) {
          console.log('into _farmer', _farmer.name)
          const body = { _id: _farmer._id, email: _farmer.username }
          const token = jwt.sign({ _farmer: body }, cfg.jwtSecret)
          let res = {
            token: token,
            role: 2,
            username: data.username,
            id: _farmer._id,
            name: _farmer.name,
            info: _farmer
          }
          return resolve(res)
        } else {
          let response = errorCode.CANT_NOT_FIND_FARMER
          response.status = 200
          return reject(response)
        }
      })
        .catch(_error => {
          let response = errorCode.CANT_NOT_FIND_FARMER
          response.status = 200
          return reject(response)
        })
    })
  }

  create (_farmer, rand, files) {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(_farmer)) {
        let response = errorCode.DATA_DOES_NOT_NULL
        response.status = 200
        return reject(response)
      }
      if (!_farmer.name) {
        let response = errorCode.MISSING_NAME
        response.status = 200
        return reject(response)
      }
      if (!_farmer.cooperativeId) {
        let response = errorCode.MISSING_IDCOOPERATIVE
        response.status = 200
        return reject(response)
      }
      Cooperative.findById({ _id: _farmer.cooperativeId })
        .then(_cooperative => {
          if (_cooperative) {
            let codeId = _farmer.cooperativeId.substring(14, _farmer.cooperativeId.length)
            //            console.log("codeID", codeId)
            const newFarmer = {
              name: _farmer.name,
              username: _farmer.username,
              password: _farmer.password,
              address: _farmer.address,
              role: 1,
              codeId: codeId + _farmer.codeFrm,
              cooperativeId: _farmer.cooperativeId
            }
            return Farmer.create(newFarmer)
              .then(farmer => resolve(farmer))
              .catch(error => {
                if (error && error.code === 11000 && error.errmsg.includes('duplicate')) {
                  let response = errorCode.COOPERATIVE_DUPLICATE
                  response.status = 200
                  return reject(response)
                }
                return reject(error)
              })
          } else {
            let response = errorCode.CANT_NOT_FIND_COOPERATIVE
            response.status = 200
            return reject(response)
          }
        })
        .catch(_error => {
          let response = errorCode.CANT_NOT_FIND_COOPERATIVE
          response.status = 200
          return reject(response)
        })
    })
  }

  update (_id, _farmer) {
    return new Promise((resolve, reject) => {
      if (_farmer.cooperativeId) {
        let response = errorCode.CAN_NOT_UPDATE_COOPERATIVE
        response.status = 200
        return reject(response)
      }
      const newFarmer = {
        name: _farmer.name,
        address: _farmer.address
      }
      return Farmer.findOneAndUpdate({ _id }, { $set: newFarmer })
        .then(farmer => {
          if (farmer) {
            farmer._doc.name = _farmer.name || farmer.name
            farmer._doc.address = _farmer.address || farmer.address
            resolve(farmer)
          } else {
            let response = errorCode.FARMER_DOES_NOT_EXIST
            response.status = 200
            return reject(response)
          }
        })
        .catch(_error => {
          if (_error && _error.kind == 'ObjectId') {
            let response = errorCode.INVALID_ID
            response.status = 200
            return reject(response)
          }
        })
    })
  }

  delete (_id) {
    return new Promise((resolve, reject) => {
      return Farmer.remove({ _id })
        .then(farmer => {
          resolve(farmer)
        })
        .catch(error => {
          if (error.kind === 'ObjectId') {
            let response = errorCode.INVALID_ID
            response.status = 200
            return reject(response)
          }
          reject(error)
        })
    })
  }
  getStatistics (_id) {
    return new Promise((resolve, reject) => {
      Farmer.findOne({ _id }).then(async (farmer) => {
        if (!farmer) {
          let error = errorCode.FARMER_DOES_NOT_EXIST
          error.status = 404
          return reject(error)
        }
        let projection = {}
        let options = {}
        try {
          const treeCount = await Tree.find({ farmerId: _id }).count()
          return resolve({ treeCount })
        } catch (err) {
          let error = errorCode.FARMER_DOES_NOT_EXIST
          error.status = 404
          return reject(error)
        }
      })
    })
  }
}

export default new FarmerController()
