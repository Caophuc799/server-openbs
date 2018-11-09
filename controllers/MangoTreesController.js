import Mangotree from '../models/mangotree'
import Cooperative from '../models/cooperative'
import User from '../models/user'
import _ from 'lodash'
import moment from 'moment'
import OpenBSSmart from '../smartContract/OpenBSSmart'

var TokenOpenBS = require('../services/TokenOpenBS')
// Mongo
var blockStart = require('../constants/constant').blockStart

class MangoTreesController {
  getAll (projection, options) {
    // const options = {
    //   skip: 0,
    //   limit: 20,
    // }
    // const projection = "";
    return new Promise((resolve, reject) => {
      Mangotree.find({}, projection, options)
        .then(mangotrees => resolve(mangotrees))
        .catch(error => reject(error))
    })
  }

  getOne (_id, projection, options) {
    return new Promise((resolve, reject) => {
      Mangotree.findOne({ _id }, projection, options)
        .then(mangotrees => resolve(mangotrees))
        .catch(error => reject(error))
    })
  }

  create (_mangotree) {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(_mangotree)) {
        return reject({ errorCode: 'Mangotree not null', msg: 'Mangotree not null' })
      }
      if (!_mangotree.idTree) {
        return reject({ errorCode: 'idTree not_null', msg: 'ud not null' })
      }
      if (!_mangotree.name) {
        return reject({ errorCode: 'name not_null', msg: 'name not null' })
      }
      if (!_mangotree.category) {
        return reject({ errorCode: 'category not_null', msg: 'category not null' })
      }
      if (!_mangotree.description) {
        return reject({ errorCode: 'description not_null', msg: 'description not null' })
      }
      if (!_mangotree.timeStartPlant) {
        return reject({ errorCode: 'timeStartPlant not_null', msg: 'timeStartPlant not null' })
      }
      if (!moment(_mangotree.timeStartPlant, 'MM/DD/YYYY', true).isValid()) {
        return reject({ errorCode: 'type of timeStartPlant must be Date ', msg: 'type of timeStartPlant must be Date' })
      }
      if (!_mangotree.idCooperative) {
        return reject({ errorCode: 'idCooperative not_null', msg: 'idCooperative not null' })
      }
      if (!_mangotree.price || (parseFloat(_mangotree.price) <= 0)) {
        return reject({ errorCode: 'price not_null and greater than 0', msg: 'price not null and greater than 0' })
      }
      return Cooperative.findById({ _id: _mangotree.idCooperative })
        .then(_cooperative => {
          if (_cooperative && !_.isEmpty(_cooperative)) {
            const currentMangotree = {
              idTree: _mangotree.idTree,
              name: _mangotree.name,
              category: _mangotree.category,
              description: _mangotree.description,
              timeStartPlant: _mangotree.timeStartPlant,
              idCooperative: _mangotree.idCooperative,
              price: _mangotree.price
            }
            return Mangotree.create(currentMangotree)
              .then(mangotree => {
                // if (_mangotree) {
                //   return TokenOpenBS.methods.mintUniqueTokenTo('0x541a359c4651E4C64C463059E5f9a30769827f82', 12, 'Duoc r ne')
                //     .send({
                //       from: '0x541a359c4651E4C64C463059E5f9a30769827f82', gas: 5000000
                //     }, (error, result) => {
                //       console.log(result)
                //       console.log(error)
                //       return result
                //     })
                //     .catch(error => {
                //       console.log(error)
                //       return error
                //     })
                // }
                // console.log(_mangotree)
                resolve(mangotree)
              })
              .catch(error => {
                return reject(error)
              })
          } else {
            reject({ errorCode: 'Can not find idCooperative', msg: 'Can not find idCooperative' })
          }
        }).catch(error => {
          console.log(error)
          reject({ errorCode: 'Can not find idCooperative', msg: 'Can not find idCooperative' })
        })
    })
  }

  update (_id, _mangotree) {
    return new Promise((resolve, reject) => {
      if (_mangotree.idCooperative) {
        return reject({ errorCode: 'can not update idCooperative', msg: 'can not update idCooperative' })
      }
      if (!_.isEmpty(_mangotree.price) && parseFloat(_mangotree.price) <= 0) {
        return reject({ errorCode: 'price greater than 0', msg: 'price greater than 0' })
      }
      const currentMangotree = {
        idTree: _mangotree.idTree,
        name: _mangotree.name,
        category: _mangotree.category,
        description: _mangotree.description,
        timeStartPlant: _mangotree.timeStartPlant,
        price: _mangotree.price
      }
      return Mangotree.findOneAndUpdate({ _id }, { $set: currentMangotree })
        .then(mangotree => {
          resolve(mangotree)
        })
        .catch(error => reject(error))
    })
  }

  delete (_id) {
    return new Promise((resolve, reject) => {
      Mangotree.remove({ _id })
        .then(mangotree => resolve(mangotree))
        .catch(error => reject(error))
    })
  }

  buyMangoTree (_id, _mangotree) {
    return new Promise((resolve, reject) => {
      if (!_mangotree.idBuyer) {
        return reject({ errorCode: 'idBuyer not null', msg: 'Buyer not null' })
      }
      return User.findById({ _id: _mangotree.idBuyer })
        .then(_user => {
          if (_user && !_.isEmpty(_user)) {
            const currentMangotree = {
              idBuyer: _mangotree.idBuyer
            }
            return Mangotree.findOneAndUpdate({ _id }, { $set: currentMangotree })
              .then(mangotree => resolve(mangotree))
              .catch(error => reject(error))
          } else {
            reject({ errorCode: 'Can not find idBuyer', msg: 'Can not find idBuyer' })
          }
        }).catch(error => {
          console.log(error)
          reject({ errorCode: 'Can not find idBuyer', msg: 'Can not find idBuyer' })
        })
    })
  }
}

export default new MangoTreesController()
