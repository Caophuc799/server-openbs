import Cooperative from '../models/cooperative'
import User from '../models/user'
import axios from 'axios'
import _ from 'lodash'
import errorCode from '../constants/ErrorCode'
import { validateEmail } from '../services/Utils'
import moment from 'moment'
import bcrypt from 'bcrypt'
import path from 'path'
import fs from 'fs'
class CooperativesController {
  getAll (projection, query = { offset: 0, limit: 0 }) {
    let options
    if (query) {
      options = {
        skip: parseInt(query.offset * query.limit),
        limit: parseInt(query.limit)
      }
    }
    return new Promise((resolve, reject) => {
      Cooperative.find({}, projection, options)
        .then(cooperatives => resolve(cooperatives))
        .catch(error => reject(error))
    })
  }

  getOne (_id, projection, options) {
    return new Promise((resolve, reject) => {
      Cooperative.findOne({ _id }, projection, options)
        .then(cooperatives => {
          if (cooperatives) {
            return resolve(cooperatives)
          } else {
            let error = errorCode.USER_DOES_NOT_EXIST
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

  create (_cooperative, rand, files) {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(_cooperative)) {
        let response = errorCode.DATA_DOES_NOT_NULL
        response.status = 200
        return reject(response)
      }
      if (!_cooperative.name) {
        let response = errorCode.MISSING_NAME
        response.status = 200
        return reject(response)
      }
      if (!_cooperative.email) {
        let response = errorCode.MISSING_EMAIL
        response.status = 200
        return reject(response)
      }
      if (!validateEmail(_cooperative.email)) {
        let response = errorCode.INVALID_EMAIL
        response.status = 200
        return reject(response)
      }
      if (!_cooperative.password) {
        let response = errorCode.MISSING_PASSWORD
        response.status = 200
        return reject(response)
      }
      if (!_cooperative.idRepresentation) {
        let response = errorCode.MISSING_IDREPRESENTATION
        response.status = 200
        return reject(response)
      }
      if (!_cooperative.taxCode) {
        let response = errorCode.MISSING_TAXCODE
        response.status = 200
        return reject(response)
      }
      // console.log(moment(_cooperative.dateOfBirth))
      axios.get('https://thongtindoanhnghiep.co/api/company/' + _cooperative.taxCode)
        .then(res => {
          // if (_.get(res, 'data.ID') && _.get(res, 'data.ID') !== 0) {
          User.findById({ _id: _cooperative.idRepresentation })
            .then(_user => {
              if (_user) {
                if (!_user.verify) {
                  let response = errorCode.REPRESENTATION_DID_NOT_VERIFY
                  response.status = 200
                  return reject(response)
                }
                let logo
                if (files && files.logo && files.logo.data) {
                  // eslint-disable-next-line node/no-deprecated-api
                  logo = new Buffer(files.logo.data, 'binary').toString('base64')
                }
                const currentCooperative = {
                  idRepresentation: _cooperative.idRepresentation,
                  taxCode: _cooperative.taxCode,
                  name: _cooperative.name,
                  email: _cooperative.email,
                  phoneNumber: _cooperative.phoneNumber,
                  address: _cooperative.address,
                  password: _cooperative.password,
                  rand: rand,
                  logo: logo || _cooperative.logo,
                  description: _cooperative.description,
                  treeIds: []
                }
                return Cooperative.create(currentCooperative)
                  .then(cooperative => resolve(cooperative))
                  .catch(error => {
                    if (error && error.code === 11000 && error.errmsg.includes('duplicate')) {
                      let response = errorCode.COOPERATIVE_DUPLICATE
                      response.status = 200
                      return reject(response)
                    }
                    return reject(error)
                  })
              } else {
                let response = errorCode.CANT_NOT_FIND_REPRESENTATION
                response.status = 200
                return reject(response)
              }
            })
            .catch(_error => {
              let response = errorCode.CANT_NOT_FIND_REPRESENTATION
              response.status = 200
              return reject(response)
            })
          // } else {
          //   let response = errorCode.INCORRECT_TAXCODE
          //   response.status = 200
          //   return reject(response)
          // }
        })
        .catch(_error => {
          let response = errorCode.INCORRECT_TAXCODE
          response.status = 200
          return reject(response)
        })
    })
  }

  update (_id, _cooperative, files) {
    return new Promise((resolve, reject) => {
      if (_cooperative.email) {
        let response = errorCode.CAN_NOT_UPDATE_EMAIL
        response.status = 200
        return reject(response)
      }
      if (_cooperative.idRepresentation) {
        return User.findById({ _id: _cooperative.idRepresentation })
          .then(_user => {
            if (_user) {
              if (!_user.verify) {
                let response = errorCode.REPRESENTATION_DID_NOT_VERIFY
                response.status = 200
                return reject(response)
              }
              let logo
              if (files && files.logo && files.logo.data) {
                // eslint-disable-next-line node/no-deprecated-api
                logo = new Buffer(files.logo.data, 'binary').toString('base64')
              }
              const newCooperative = {
                idRepresentation: _cooperative.idRepresentation,
                taxCode: _cooperative.taxCode,
                name: _cooperative.name,
                phoneNumber: _cooperative.phoneNumber,
                address: _cooperative.address,
                logo: logo || _cooperative.logo,
                description: _cooperative.description
              }
              return Cooperative.findOneAndUpdate({ _id }, { $set: newCooperative })
                .then(cooperative => {
                  console.log(cooperative)
                  if (cooperative) {
                    resolve(cooperative)
                  } else {
                    let response = errorCode.COOPERATIVE_DOES_NOT_EXIST
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
            } else {
              let response = errorCode.CANT_NOT_FIND_REPRESENTATION
              response.status = 200
              return reject(response)
            }
          })
          .catch(_error => {
            return reject(_error)
          })
      } else {
        const newCooperative = {
          idRepresentation: _cooperative.idRepresentation,
          taxCode: _cooperative.taxCode,
          name: _cooperative.name,
          phoneNumber: _cooperative.phoneNumber,
          address: _cooperative.address,
          logo: _cooperative.logo,
          description: _cooperative.description
        }
        return Cooperative.findOneAndUpdate({ _id }, { $set: newCooperative })
          .then(cooperative => {
            if (cooperative) {
              resolve(cooperative)
            } else {
              let response = errorCode.COOPERATIVE_DOES_NOT_EXIST
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
      }
    })
  }

  delete (_id) {
    return new Promise((resolve, reject) => {
      return Cooperative.remove({ _id })
        .then(cooperative => {
          resolve(cooperative)
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

  verifyAccount (_id, rand) {
    return new Promise((resolve, reject) => {
      return Cooperative.findById({ _id })
        .then(_cooperative => {
          // console.log(_cooperative.rand)
          if (parseInt(_cooperative.rand) === parseInt(rand)) {
            // console.log(_cooperative)
            var newrand = Math.floor((Math.random() * 100000) + (Math.random() * 10000) + (Math.random() * 1000) + (Math.random() * 100))
            return Cooperative.findOneAndUpdate({ _id }, { $set: { verify: true, rand: newrand } })
              .then(cooperative => {
                if (cooperative) {
                  resolve(cooperative)
                } else {
                  let response = errorCode.COOPERATIVE_DOES_NOT_EXIST
                  response.status = 200
                  return reject(response)
                }
              })
              .catch(error => reject(error))
          } else {
            let response = errorCode.INVALID_TOKEN
            response.status = 200
            return reject(response)
          }
        })
        .catch(error => reject(error))
    })
  }

  resendEmail (_id, newrand) {
    return new Promise((resolve, reject) => {
      Cooperative.findById({ _id })
        .then(_cooperative => {
          if (!_cooperative.verify) {
            return Cooperative.findOneAndUpdate({ _id }, { $set: { rand: newrand } })
              .then(cooperative => resolve(cooperative))
              .catch(error => reject(error))
          } else {
            let response = errorCode.ALREADY_VERIFY
            response.status = 200
            return reject(response)
          }
        })
        .catch(error => reject(error))
    })
  }

  login ({ email, password }) {
    return new Promise((resolve, reject) => {
      if (!email) {
        let response = errorCode.MISSING_EMAIL
        response.status = 200
        return reject(response)
      }
      if (!validateEmail(email)) {
        let response = errorCode.INVALID_EMAIL
        response.status = 200
        return reject(response)
      }
      if (!password) {
        let response = errorCode.MISSING_PASSWORD
        response.status = 200
        return reject(response)
      }
      Cooperative.findOne({ email })
        .then(_cooperative => {
          if (!_cooperative || _.isEmpty(_cooperative)) {
            let response = errorCode.USER_DOES_NOT_EXIST
            response.status = 200
            return reject(response)
          }
          if (_cooperative && _cooperative.verify) {
            bcrypt.compare(password, _cooperative.password, function (_err, res) {
              if (res) {
                resolve(_cooperative)
              } else {
                let response = errorCode.INCORRECT_PASSWORD
                response.status = 200
                return reject(response)
              }
            })
          } else {
            let response = errorCode.DID_NOT_VERIFY
            response.status = 200
            return reject(response)
          }
        })
        .catch(error => reject(error))
    })
  }

  changePassword ({ email, oldPassword, newPassword }) {
    return new Promise((resolve, reject) => {
      if (!email) {
        let response = errorCode.MISSING_EMAIL
        response.status = 200
        return reject(response)
      }
      if (!validateEmail(email)) {
        let response = errorCode.INVALID_EMAIL
        response.status = 200
        return reject(response)
      }
      if (!oldPassword) {
        let response = errorCode.MISSING_OLDPASSWORD
        response.status = 200
        return reject(response)
      }
      if (!newPassword) {
        let response = errorCode.MISSING_NEWPASSWORD
        response.status = 200
        return reject(response)
      }
      if (newPassword === oldPassword) {
        let response = errorCode.OLDPASSWORD_DOES_NOT_SAME_NEWPASSWORD
        response.status = 200
        return reject(response)
      }
      var hashPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8), null)
      Cooperative.findOne({ email })
        .then(_cooperative => {
          if (!_cooperative || _.isEmpty(_cooperative)) {
            let response = errorCode.USER_DOES_NOT_EXIST
            response.status = 200
            return reject(response)
          }
          if (_cooperative && _cooperative.verify) {
            bcrypt.compare(oldPassword, _cooperative.password, function (_err, res) {
              if (res) {
                Cooperative.findOneAndUpdate({ email }, { $set: { password: hashPassword } })
                  .then(cooperative => resolve(cooperative))
                  .catch(error => reject(error))
              } else {
                let response = errorCode.INCORRECT_PASSWORD
                response.status = 200
                return reject(response)
              }
            })
          } else {
            let response = errorCode.DID_NOT_VERIFY
            response.status = 200
            return reject(response)
          }
        })
        .catch(error => reject(error))
    })
  }
}

export default new CooperativesController()
