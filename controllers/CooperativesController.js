import Cooperative from '../models/cooperative'
import User from '../models/user'
import axios from 'axios'
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
        .then(cooperatives => resolve(cooperatives))
        .catch(error => reject(error))
    })
  }

  getOne (_id, projection, options) {
    return new Promise((resolve, reject) => {
      Cooperative.findOne({ _id }, projection, options)
        .then(cooperatives => resolve(cooperatives))
        .catch(error => reject(error))
    })
  }

  create (_cooperative, rand) {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(_cooperative)) {
        return reject({ errorCode: 'cooperative not null', msg: 'Cooperative not null' })
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
      if (!_cooperative.idRepresentation) {
        return reject({ errorCode: 'idRepresentation not_null', msg: 'idRepresentation not null' })
      }
      if (!_cooperative.taxCode) {
        return reject({ errorCode: 'taxCode not_null', msg: 'taxCode not null' })
      }
      var hashPassword = bcrypt.hashSync(_cooperative.password, bcrypt.genSaltSync(8), null)
      // console.log(moment(_cooperative.dateOfBirth))
      axios.get('https://thongtindoanhnghiep.co/api/company/' + _cooperative.taxCode)
        .then(res => {
          if (_.get(res, 'data.ID') && _.get(res, 'data.ID') !== 0) {
            User.findById({ _id: _cooperative.idRepresentation })
              .then(_user => {
                if (_user) {
                  if (!_user.verify) {
                    return reject({ errorCode: 'idrepresentation had not verify', msg: 'idrepresentation had not verify' })
                  }
                  const currentCooperative = {
                    idRepresentation: _cooperative.idRepresentation,
                    taxCode: _cooperative.taxCode,
                    name: _cooperative.name,
                    email: _cooperative.email,
                    phoneNumber: _cooperative.phoneNumber,
                    address: _cooperative.address,
                    password: hashPassword,
                    rand: rand,
                    logo: _cooperative.logo
                  }
                  console.log(currentCooperative)
                  return Cooperative.create(currentCooperative)
                    .then(cooperative => resolve(cooperative))
                    .catch(error => {
                      return reject(error)
                    })
                } else {
                  reject({ errorCode: 'Can not find idrepresentation', msg: 'Can not find idrepresentation' })
                }
              })
              .catch(error => {
                console.log(error)
                reject({ errorCode: 'Can not find idrepresentation', msg: 'Can not find idrepresentation' })
              })
          } else {
            reject({ errorCode: 'taxcode fail', msg: 'taxcode fail' })
          }
        })
        .catch(_error => {
          console.log(_error)
          reject({ errorCode: 'taxcode fail', msg: 'taxcode fail' })
        })
    })
  }

  update (_id, _cooperative) {
    return new Promise((resolve, reject) => {
      if (_cooperative.email) {
        return reject({ errorCode: 'can not update email', msg: 'can not update email' })
      }
      if (_cooperative.idRepresentation) {
        return User.findById({ _id: _cooperative.idRepresentation })
          .then(_user => {
            if (_user) {
              if (!_user.verify) {
                return reject({ errorCode: 'idrepresentation had not verify', msg: 'idrepresentation had not verify' })
              }
              const newCooperative = {
                idRepresentation: _cooperative.idRepresentation,
                taxCode: _cooperative.taxCode,
                name: _cooperative.name,
                phoneNumber: _cooperative.phoneNumber,
                address: _cooperative.address,
                logo: _cooperative.logo
              }
              return Cooperative.findOneAndUpdate({ _id }, { $set: newCooperative })
                .then(cooperative => resolve(cooperative))
                .catch(error => reject(error))
            } else {
              reject({ errorCode: 'Can not find idrepresentation', msg: 'Can not find idrepresentation' })
            }
          })
          .catch(error => {
            console.log(error)
            reject({ errorCode: 'Can not find idrepresentation', msg: 'Can not find idrepresentation' })
          })
      }
      const newCooperative = {
        idRepresentation: _cooperative.idRepresentation,
        taxCode: _cooperative.taxCode,
        name: _cooperative.name,
        phoneNumber: _cooperative.phoneNumber,
        address: _cooperative.address,
        logo: _cooperative.logo
      }
      return Cooperative.findOneAndUpdate({ _id }, { $set: newCooperative })
        .then(cooperative => resolve(cooperative))
        .catch(error => reject(error))
    })
  }

  delete (_id) {
    return new Promise((resolve, reject) => {
      return Cooperative.remove({ _id })
        .then(cooperative => resolve(cooperative))
        .catch(error => reject(error))
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
              .then(cooperative => resolve(cooperative))
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
              .then(cooperative => resolve(cooperative))
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
      if (!validateEmail(email)) {
        return reject({ errorCode: 'email not valid', msg: 'email not valid' })
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
      if (!validateEmail(email)) {
        return reject({ errorCode: 'email not valid', msg: 'email not valid' })
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
                  .then(cooperative => resolve(cooperative))
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
