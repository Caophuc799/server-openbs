import User from '../models/user'
import _ from 'lodash'
import { validateEmail } from '../services/Utils'
import moment from 'moment'
import bcrypt from 'bcrypt'

class UsersController {
  getAll (query = { offset: 0, limit: 0 }, projection) {
    let options
    if (query) {
      console.log(query)
      options = {
        skip: parseInt(query.offset * query.limit) || 0,
        limit: parseInt(query.limit) || 0
      }
    }
    console.log(options)
    // const projection = "";
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
            reject({ status: 404, errorCode: `Doesn't exist user`, msg: `Doesn't exist user` })
          }
        })
        .catch(error => reject(error))
    })
  }

  create (_user, rand) {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(_user)) {
        return reject({ status: 422, errorCode: 'user not null', msg: 'User not null' })
      }
      if (!_user.firstName) {
        return reject({ status: 422, errorCode: 'firstName not_null', msg: 'firstName not null' })
      }
      if (!_user.dateOfBirth) {
        return reject({ status: 422, errorCode: 'dateOfBirth not_null', msg: 'dateOfBirth not null' })
      }
      if (!moment(_user.dateOfBirth, 'MM/DD/YYYY', true).isValid()) {
        return reject({ status: 422, errorCode: 'type of dateOfBirth must be Date ', msg: 'type of dateOfBirth must be Date' })
      }
      if (!_user.email) {
        return reject({ status: 422, errorCode: 'email not_null', msg: 'email not null' })
      }
      if (!validateEmail(_user.email)) {
        return reject({ status: 422, errorCode: 'email not valid', msg: 'email not valid' })
      }
      if (!_user.password) {
        return reject({ status: 422, errorCode: 'password not_null', msg: 'password not null' })
      }
      var hashPassword = bcrypt.hashSync(_user.password, bcrypt.genSaltSync(8), null)
      // console.log(moment(_user.dateOfBirth))
      const currentUser = {
        firstName: _user.firstName,
        lastName: _user.lastName,
        dateOfBirth: _user.dateOfBirth,
        email: _user.email,
        phoneNumber: _user.phoneNumber,
        address: _user.address,
        password: hashPassword,
        rand: rand,
        avatar: _user.avatar
      }
      User.create(currentUser)
        .then(user => resolve(user))
        .catch(error => {
          return reject(error)
        })
    })
  }

  update (_id, _user) {
    return new Promise((resolve, reject) => {
      if (_user.email) {
        return reject({ status: 403, errorCode: 'can not update email', msg: 'can not update email' })
      }
      if (_user.dateOfBirth && !moment(_user.dateOfBirth, 'MM/DD/YYYY', true).isValid()) {
        return reject({ status: 422, errorCode: 'type of dateOfBirth must be Date ', msg: 'type of dateOfBirth must be Date' })
      }
      let newUser = {
        firstName: _user.firstName,
        lastName: _user.lastName,
        dateOfBirth: moment(_user.dateOfBirth).format('MM/DD/YYYY'),
        phoneNumber: _user.phoneNumber,
        address: _user.address,
        avatar: _user.avatar
      }
      User.findOneAndUpdate({ _id }, { $set: newUser })
        .then(user => {
          if (user) {
            resolve(user)
          } else {
            reject({ status: 404, errorCode: `Doesn't exist user`, msg: `Doesn't exist user` })
          }
        })
        .catch(error => reject(error))
    })
  }

  delete (_id) {
    return new Promise((resolve, reject) => {
      User.deleteOne({ _id })
        .then(user => resolve(user))
        .catch(error => reject(error))
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
            reject('Incorrect token')
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
      User.findOne({ email })
        .then(_user => {
          if (!_user || _.isEmpty(_user)) {
            return reject({ errorCode: 'Can not found account', msg: 'Can not found account' })
          }
          if (_user && _user.verify) {
            bcrypt.compare(password, _user.password, function (_err, res) {
              if (res) {
                resolve(_user)
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
        return reject({ status: 422, errorCode: 'email not_null', msg: 'email not null' })
      }
      if (!validateEmail(email)) {
        return reject({ status: 422, errorCode: 'email not valid', msg: 'email not valid' })
      }
      if (!oldPassword) {
        return reject({ status: 422, errorCode: 'oldPassword not_null', msg: 'oldPassword not null' })
      }
      if (!newPassword) {
        return reject({ status: 422, errorCode: 'newPassword not_null', msg: 'newPassword not null' })
      }
      if (newPassword === oldPassword) {
        return reject({ status: 422, errorCode: 'newPassword must same oldPassword', msg: 'newPassword must same oldPassword' })
      }
      var hashPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8), null)
      User.findOne({ email })
        .then(_user => {
          if (!_user || _.isEmpty(_user)) {
            return reject({ errorCode: 'Can not found account', msg: 'Can not found account' })
          }
          if (_user && _user.verify) {
            bcrypt.compare(oldPassword, _user.password, function (_err, res) {
              if (res) {
                User.findOneAndUpdate({ email }, { $set: { password: hashPassword } })
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

export default new UsersController()
