/* eslint-disable handle-callback-err */
import express from 'express'
import _ from 'lodash'
import passport from '../../services/auth'
import UsersController from '../../controllers/UsersController'
import PurchaseController from '../../controllers/PurchaseHistory'
const router = express.Router()

// router.use(verifyToken)
/* GET ALL users */
router.get('/', passport.authenticate(), (req, res, next) => {
  UsersController.getAll(req.query)
    .then(users => {
      res.json({ success: true, data: users })
    })
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})

/* GET SINGLE user BY ID */
router.get('/:id', passport.authenticate(), (req, res, next) => {
  UsersController.getOne(req.params.id)
    .then(user => res.json({ success: true, data: user }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})

/* GET ALL get Oder OF USER  BY ID  */
router.get('/:id/trees', passport.authenticate(), (req, res, next) => {
  PurchaseController.getTreeByUserId(req.params.id, req.query)
    .then(order => {
      res.json({ success: true, data: order })
    })
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})

/* GET ALL get Oder OF USER  BY ID  */
router.get('/:id/orders', passport.authenticate(), (req, res, next) => {
  PurchaseController.getOrdersByUserId(req.params.id, req.query)
    .then(order => {
      res.json({ success: true, data: order })
    })
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})

/* UPDATE user */
router.put('/:id', passport.authenticate(), (req, res, next) => {
  UsersController.update(req.params.id, req.body)
    .then(user => res.json({ success: true, data: user }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})

/* DELETE user */
router.delete('/:id', passport.authenticate(), (req, res, next) => {
  UsersController.delete(req.params.id, req.body)
    .then(user => res.json({ success: true, data: {} }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      let response = { success: false, data: {} }
      return res.json(status, _.merge(response, _error))
    })
})

export default router
