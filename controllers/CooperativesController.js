import Cooperative from '../models/cooperative'
import _ from 'lodash'
import { validateEmail } from '../services/Utils'
import moment from 'moment'
import bcrypt from 'bcrypt'

class CooperativesController {
  getAll (projection, options) {
    // const options = {
    //   skip: 0,
    //   limit: 20,
    // }
    // const projection = "";
    return new Promise((resolve, reject) => {
      Cooperative.find({}, projection, options)
        .then(users => resolve(users))
        .catch(error => reject(error))
    })
  }

  getOne (_id, projection, options) {
    return new Promise((resolve, reject) => {
      Cooperative.find({ _id }, projection, options)
        .then(users => resolve(users))
        .catch(error => reject(error))
    })
  }

  create (_cooperative, rand) {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(_cooperative)) {
        return reject({ errorCode: 'user not null', msg: 'Cooperative not null' })
      }
      if (!_cooperative.name) {
        return reject({ errorCode: 'name not_null', msg: 'name not null' })
      }
      if (!_cooperative.email) {
        return reject({ errorCode: 'email not_null', msg: 'email not null' })
      }
      if (!validateEmail(_cooperative.email)) {
        return reject({ errorCode: 'email not valid', msg: 'email not valid' })
      }
      if (!_cooperative.password) {
        return reject({ errorCode: 'password not_null', msg: 'password not null' })
      }
      var hashPassword = bcrypt.hashSync(_cooperative.password, bcrypt.genSaltSync(8), null)
      // console.log(moment(_cooperative.dateOfBirth))
      const currentCooperative = {
        idRepresentation: _cooperative.idRepresentation,
        taxCode: _cooperative.taxCode,
        name: _cooperative.name,
        email: _cooperative.email,
        phoneNumber: _cooperative.phoneNumber,
        address: _cooperative.address,
        password: hashPassword,
        rand: rand
      }
      Cooperative.create(currentCooperative)
        .then(user => resolve(user))
        .catch(error => {
          return reject(error)
        })
    })
  }

  update (_id, _cooperative) {
    return new Promise((resolve, reject) => {
      if (_cooperative.email) {
        return reject({ errorCode: 'can not update email', msg: 'can not update email' })
      }
      const newCooperative = {
        idRepresentation: _cooperative.idRepresentation,
        taxCode: _cooperative.taxCode,
        name: _cooperative.name,
        phoneNumber: _cooperative.phoneNumber,
        address: _cooperative.address
      }
      Cooperative.findOneAndUpdate({ _id }, { $set: newCooperative })
        .then(user => resolve(user))
        .catch(error => reject(error))
    })
  }

  delete (_id) {
    return new Promise((resolve, reject) => {
      Cooperative.remove({ _id })
        .then(user => resolve(user))
        .catch(error => reject(error))
    })
  }

  verifyAccount (_id, rand) {
    return new Promise((resolve, reject) => {
      Cooperative.findById({ _id })
        .then(_cooperative => {
          // console.log(_cooperative.rand)
          if (parseInt(_cooperative.rand) === parseInt(rand)) {
            // console.log(_cooperative)
            var newrand = Math.floor((Math.random() * 100000) + (Math.random() * 10000) + (Math.random() * 1000) + (Math.random() * 100))
            return Cooperative.findOneAndUpdate({ _id }, { $set: { verify: true, rand: newrand } })
              .then(user => resolve(user))
              .catch(error => reject(error))
          } else {
            reject('Incorrect token')
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
              .then(user => resolve(user))
              .catch(error => reject(error))
          } else {
            reject({ errorCode: 'Account already verify', msg: 'Account already verify' })
          }
        })
        .catch(error => reject(error))
    })
  }

  login ({ email, password }) {
    return new Promise((resolve, reject) => {
      if (!email) {
        return reject({ errorCode: 'email not_null', msg: 'email not null' })
      }
      if (!password) {
        return reject({ errorCode: 'password not_null', msg: 'password not null' })
      }
      Cooperative.findOne({ email })
        .then(_cooperative => {
          if (!_cooperative || _.isEmpty(_cooperative)) {
            return reject({ errorCode: 'Can not found account', msg: 'Can not found account' })
          }
          if (_cooperative && _cooperative.verify) {
            bcrypt.compare(password, _cooperative.password, function (_err, res) {
              if (res) {
                resolve(_cooperative)
              } else {
                return reject({ errorCode: 'Incorrect password', msg: 'Incorrect password' })
              }
            })
          } else {
            reject({ errorCode: 'Account not verify', msg: 'Account not verify' })
          }
        })
        .catch(error => reject(error))
    })
  }

  changePassword ({ email, oldPassword, newPassword }) {
    return new Promise((resolve, reject) => {
      if (!email) {
        return reject({ errorCode: 'email not_null', msg: 'email not null' })
      }
      if (!oldPassword) {
        return reject({ errorCode: 'oldPassword not_null', msg: 'oldPassword not null' })
      }
      if (!newPassword) {
        return reject({ errorCode: 'newPassword not_null', msg: 'newPassword not null' })
      }
      if (newPassword === oldPassword) {
        return reject({ errorCode: 'newPassword must same oldPassword', msg: 'newPassword must same oldPassword' })
      }
      var hashPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8), null)
      Cooperative.findOne({ email })
        .then(_cooperative => {
          if (!_cooperative || _.isEmpty(_cooperative)) {
            return reject({ errorCode: 'Can not found account', msg: 'Can not found account' })
          }
          if (_cooperative && _cooperative.verify) {
            bcrypt.compare(oldPassword, _cooperative.password, function (_err, res) {
              if (res) {
                Cooperative.findOneAndUpdate({ email }, { $set: { password: hashPassword } })
                  .then(user => resolve(user))
                  .catch(error => reject(error))
              } else {
                return reject({ errorCode: 'Incorrect password', msg: 'Incorrect password' })
              }
            })
          } else {
            reject({ errorCode: 'Account not verify', msg: 'Account not verify' })
          }
        })
        .catch(error => reject(error))
    })
  }
}

export default new CooperativesController()
