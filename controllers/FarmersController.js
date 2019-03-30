import Farmer from '../models/farmer'
import User from '../models/user'
import Cooperative from '../models/cooperative'
import _ from 'lodash'
import errorCode from '../constants/ErrorCode'
import { validateEmail } from '../services/Utils'
import bcrypt from 'bcrypt'
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
            const newFarmer = {
              name: _farmer.name,
              address: _farmer.address,
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
}

export default new FarmerController()
