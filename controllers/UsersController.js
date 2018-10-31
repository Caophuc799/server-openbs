import User from '../models/user'
import _ from 'lodash'
import { validateEmail } from '../services/Utils'
import moment from 'moment'

class UsersController {
  getAll (projection, options) {
    // const options = {
    //   skip: 0,
    //   limit: 20,
    // }
    // const projection = "";
    return new Promise((resolve, reject) => {
      User.find({}, projection, options)
        .then(users => resolve(users))
        .catch(error => reject(error))
    })
  }

  getOne (_id, projection, options) {
    return new Promise((resolve, reject) => {
      User.find({ _id }, projection, options)
        .then(users => resolve(users))
        .catch(error => reject(error))
    })
  }

  create (_user) {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(_user)) {
        return reject({ errorCode: 'user not null', msg: 'User not null' })
      }
      if (!_user.firstName) {
        return reject({ errorCode: 'firstName not_null', msg: 'firstName not null' })
      }
      if (!_user.dateOfBirth) {
        return reject({ errorCode: 'dateOfBirth not_null', msg: 'dateOfBirth not null' })
      }
      if (!moment(_user.dateOfBirth, 'MM/DD/YYYY', true).isValid()) {
        return reject({ errorCode: 'type of dateOfBirth must be Date ', msg: 'type of dateOfBirth must be Date' })
      }
      if (!_user.email) {
        return reject({ errorCode: 'email not_null', msg: 'email not null' })
      }
      if (!validateEmail(_user.email)) {
        return reject({ errorCode: 'email not valid', msg: 'email not valid' })
      }
      const currentUser = {
        firstName: _user.firstName,
        lastName: _user.lastName,
        dateOfBirth: moment(_user.dateOfBirth).format('MM/DD/YYYY'),
        email: _user.email,
        phoneNumber: _user.phoneNumber,
        address: _user.address,
        password: _user.password
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
      if (_user.dateOfBirth && !moment(_user.dateOfBirth, 'MM/DD/YYYY', true).isValid()) {
        return reject({ errorCode: 'type of dateOfBirth must be Date ', msg: 'type of dateOfBirth must be Date' })
      }
      if (_user.email && !validateEmail(_user.email)) {
        return reject({ errorCode: 'email not valid', msg: 'email not valid' })
      }
      User.findByIdAndUpdate({ _id }, { $set: _user })
        .then(user => resolve(user))
        .catch(error => reject(error))
    })
  }

  delete (_id) {
    return new Promise((resolve, reject) => {
      User.remove({ _id })
        .then(user => resolve(user))
        .catch(error => reject(error))
    })
  }
}

export default new UsersController()
