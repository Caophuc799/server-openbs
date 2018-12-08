import Mangotree from '../models/mangotree'
import Cooperative from '../models/cooperative'
import User from '../models/user'
import _ from 'lodash'
import moment from 'moment'
import ErrorCode from '../constants/ErrorCode'

class MangoTreesController {
  getAll(query, projection, options) {
    // const options = {
    //   skip: 0,
    //   limit: 20,
    // }
    // const projection = "";
    let curQuery = {}
    if (query && query.idCooperative) {
      curQuery.idCooperative = query.idCooperative
    }
    if (query && query.idBuyer) {
      curQuery.idBuyer = query.idBuyer === 'null' ? null : query.idBuyer
    }
    return new Promise((resolve, reject) => {
      Mangotree.find(curQuery, projection, options)
        .then(mangotrees => resolve(mangotrees))
        .catch(error => reject(error))
    })
  }

  getOne(_id, projection, options) {
    return new Promise((resolve, reject) => {
      Mangotree.findOne({ _id }, projection, options)
        .then(mangotrees => {
          if (mangotrees) {
            return resolve(mangotrees)
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

  create(_mangotree) {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(_mangotree)) {
        let response = ErrorCode.DATA_DOES_NOT_NULL
        response.status = 200
        return reject(response)
      }
      if (!_mangotree.idTree) {
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
      if (!_mangotree.description) {
        let response = ErrorCode.MISSING_DESCRIPTION
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
      if (!_mangotree.idCooperative) {
        let response = ErrorCode.MISSING_IDCOOPERATIVE
        response.status = 200
        return reject(response)
      }
      if (!_mangotree.price || (parseFloat(_mangotree.price) <= 0)) {
        let response = ErrorCode.PRICE_MUST_BE_THAN_ZERO
        response.status = 200
        return reject(response)
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
              price: _mangotree.price,
              image: _mangotree.image,
              manyImages: _mangotree.manyImages || []
            }
            return Mangotree.create(currentMangotree)
              .then(mangotree => {
                // OpenBS.mintUniqueTokenTo('0xc23e221736376daf733F19bA17009F53D71e059a', 2, 'TOT 2')
                //   .then(result => {
                //     console.log('result 131: ', result)
                //   })
                //   .catch(error => {
                //     console.log('error 134: ', error)
                //   })
                resolve(mangotree)
              })
              .catch(error => {
                if (error && error.code === 11000 && error.errmsg.includes('duplicate')) {
                  let response = ErrorCode.MANGOTREE_EXIST
                  response.status = 200
                  return reject(response)
                }
                return reject(error)
              })
          } else {
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

  update(_id, _mangotree) {
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
        category: _mangotree.category,
        description: _mangotree.description,
        timeStartPlant: _mangotree.timeStartPlant,
        price: _mangotree.price,
        image: _mangotree.image
      }
      if (_mangotree.idTree) {
        currentMangotree.idTree = _mangotree.idTree
      }
      let expression = { $set: currentMangotree }
      if (_mangotree.manyImages) {
        expression['$push'] = { manyImages: _mangotree.manyImages }
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
          if (error.kind == 'ObjectId') {
            let response = ErrorCode.INVALID_ID
            response.status = 200
            return reject(response)
          }
          reject(error)
        })
    })
  }

  delete(_id) {
    return new Promise((resolve, reject) => {
      Mangotree.deleteOne({ _id })
        .then(mangotree => {
          resolve(mangotree)
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

  buyMangoTree(_id, _mangotree) {
    return new Promise((resolve, reject) => {

      if (!_mangotree.idBuyer) {
        let response = ErrorCode.MISSING_IDBUYER
        response.status = 200
        return reject(response)
      }
      return User.findById({ _id: _mangotree.idBuyer })
        .then(_user => {
          if (_user && !_.isEmpty(_user)) {
            const currentMangotree = {
              idBuyer: _mangotree.idBuyer
            }
            return Mangotree.findOneAndUpdate({ _id }, { $set: currentMangotree })
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
                if (error && error.kind == 'ObjectId') {
                  let response = ErrorCode.INVALID_ID
                  response.status = 200
                  return reject(response)
                }
              })
          }
          else {
            let response = ErrorCode.CANT_NOT_FIND_BUYER
            response.status = 200
            return reject(response)
          }
        }).catch(_error => {

          //let response = ErrorCode.CANT_NOT_FIND_BUYER
          //response.status = 200
          return reject(_error)
        })
    })
  }
}

export default new MangoTreesController()
