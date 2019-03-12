import User from '../models/user'
import _ from 'lodash'
import { validateEmail } from '../services/Utils'
import moment from 'moment'
import bcrypt from 'bcrypt'
import errorCode from '../constants/ErrorCode'
import fs from 'fs'
import path from 'path'
class UsersController {
  getAll (query = { offset: 0, limit: 0 }, projection) {
    let options
    if (query) {
      options = {
        skip: parseInt(query.offset * query.limit),
        limit: parseInt(query.limit)
      }
    }
    return new Promise((resolve, reject) => {
      User.find({}, projection, options)
        .then(users => resolve(users))
        .catch(error => reject(error))
    })
  }

  getOne (_id, projection, options) {
    return new Promise((resolve, reject) => {
      User.findOne({ _id }, projection, options)
        .then(users => {
          if (users) {
            return resolve(users)
          } else {
            let error = errorCode.USER_DOES_NOT_EXIST
            error.status = 404
            reject(error)
          }
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

  create (_user, rand, files) {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(_user)) {
        let response = errorCode.DATA_DOES_NOT_NULL
        response.status = 200
        return reject(response)
      }
      if (!_user.firstName) {
        let response = errorCode.MISSING_FIRSTNAME
        response.status = 200
        return reject(response)
      }
      if (!_user.dateOfBirth) {
        let response = errorCode.MISSING_DATEOFBIRTH
        response.status = 200
        return reject(response)
      }
      if (!moment(_user.dateOfBirth, 'MM/DD/YYYY', true).isValid()) {
        let response = errorCode.INVALID_DATEOFBIRTH
        response.status = 200
        return reject(response)
      }
      if (!_user.email) {
        let response = errorCode.MISSING_EMAIL
        response.status = 200
        return reject(response)
      }
      if (!validateEmail(_user.email)) {
        let response = errorCode.INVALID_EMAIL
        response.status = 200
        return reject(response)
      }
      if (!_user.password) {
        let response = errorCode.MISSING_PASSWORD
        response.status = 200
        return reject(response)
      }
      // var hashPassword = bcrypt.hashSync(_user.password, bcrypt.genSaltSync(8), null)
      // console.log(moment(_user.dateOfBirth))
      let avatar
      if (files.avatar && files.avatar.data) {
        // eslint-disable-next-line node/no-deprecated-api
        avatar = new Buffer(files.avatar.data, 'binary').toString('base64')
      }
      const currentUser = {
        firstName: _user.firstName,
        lastName: _user.lastName,
        dateOfBirth: _user.dateOfBirth,
        email: _user.email,
        phoneNumber: _user.phoneNumber,
        address: _user.address,
        password: _user.password,
        rand: rand,
        avatar: avatar || _user.avatar
      }
      User.create(currentUser)
        .then(user => resolve(user))
        .catch(error => {
          if (error && error.code === 11000 && error.errmsg.includes('email_1') && error.errmsg.includes('duplicate')) {
            let response = errorCode.EMAIL_EXIST
            response.status = 200
            return reject(response)
          }
          return reject(error)
        })
    })
  }

  update (_id, _user, files) {
    return new Promise((resolve, reject) => {
      if (_user.email) {
        let response = errorCode.CAN_NOT_UPDATE_EMAIL
        response.status = 200
        return reject(response)
      }
      if (_user.dateOfBirth && !moment(_user.dateOfBirth, 'MM/DD/YYYY', true).isValid()) {
        let response = errorCode.INVALID_DATEOFBIRTH
        response.status = 200
        return reject(response)
      }
      let avatar
      if (files.avatar && files.avatar.data) {
        // eslint-disable-next-line node/no-deprecated-api
        avatar = new Buffer(files.avatar.data, 'binary').toString('base64')
      }
      let newUser = {
        firstName: _user.firstName,
        lastName: _user.lastName,
        dateOfBirth: moment(_user.dateOfBirth).format('MM/DD/YYYY'),
        phoneNumber: _user.phoneNumber,
        address: _user.address,
        avatar: avatar || _user.avatar
      }
      User.findOneAndUpdate({ _id }, { $set: newUser })
        .then(user => {
          if (user) {
            resolve(user)
          } else {
            let response = errorCode.USER_DOES_NOT_EXIST
            response.status = 200
            return reject(response)
          }
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

  delete (_id) {
    return new Promise((resolve, reject) => {
      User.deleteOne({ _id })
        .then(user => {
          console.log(user)
          resolve(user)
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
      User.findById({ _id })
        .then(_user => {
          // console.log(_user.rand)
          if (parseInt(_user.rand) === parseInt(rand)) {
            // console.log(_user)
            var newrand = Math.floor((Math.random() * 100000) + (Math.random() * 10000) + (Math.random() * 1000) + (Math.random() * 100))
            return User.findOneAndUpdate({ _id }, { $set: { verify: true, rand: newrand } })
              .then(user => resolve(user))
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
      User.findById({ _id })
        .then(_user => {
          if (!_user.verify) {
            return User.findOneAndUpdate({ _id }, { $set: { rand: newrand } })
              .then(user => resolve(user))
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

  changePassword ({ email, oldPassword, newPassword }) {
    return new Promise((resolve, reject) => {
      if (!email) {
        let response = errorCode.MISSING_EMAIL
        response.status = 200
        return reject(response)
      }
      if (!validateEmail(email)) {
        let response = errorCode.INCORRECT_PASSWORD
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
      // var hashPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8), null)
      User.findOne({ email })
        .then(_user => {
          if (!_user || _.isEmpty(_user)) {
            let response = errorCode.USER_DOES_NOT_EXIST
            response.status = 200
            return reject(response)
          }
          if (_user && _user.verify) {
            bcrypt.compare(oldPassword, _user.password, function (_err, res) {
              if (res) {
                User.findOneAndUpdate({ email }, { $set: { password: newPassword } })
                  .then(user => resolve(user))
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

export default new UsersController()
