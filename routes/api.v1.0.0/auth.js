
import UsersController from '../../controllers/UsersController'
import CooperativesController from '../../controllers/CooperativesController'
import { transporter } from '../../constants/constant'
import cfg from '../../config'
import _ from 'lodash'
const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = express.Router()
let link
var http = 'http'
// When the user sends a post request to this route, passport authenticates the user based on the
// middleware created previously

/* SAVE user */
router.post('/user/signup', (req, res, next) => {
  let rand = Math.floor((Math.random() * 100000) + (Math.random() * 10000) + (Math.random() * 1000) + (Math.random() * 100))
  UsersController.create(req.body, rand, req.files)
    .then(user => {
      link = `${http}://${req.get('host')}/api/users/verify/${user._id}?rand=` + rand
      var errorSendEmail = sendEmail(req.body.email, link)
      if (errorSendEmail) {
        return res.json({ errorCode: 'error when send verify email', msg: errorSendEmail })
      }
      return res.json({ success: true, data: user })
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

router.post('/user/login', async (req, res, next) => {
  passport.authenticate('loginuser', async (err, user, info) => {
    try {
      if (err || !user) {
        return res.json({ auth: false, message: info.message })
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)
        // We don't want to store the sensitive information such as the
        // user password in the token so we pick only the email and id
        const body = { _id: user._id, email: user.email }
        // Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, cfg.jwtSecret)
        // Send back the token to the user
        delete user.password
        return res.json({ auth: true, token, id: user._id, email: user.email, info: user })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

/* Change password by Email */
router.post('/user/changepassword', function (req, res) {
  UsersController.changePassword(req.body)
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

/* Verify Email */
router.get('/user/verify/:id', function (req, res) {
  UsersController.verifyAccount(req.params.id, req.query.rand)
    .then(user => {
      res.end('<h1>Email is been Successfully verified')
      // res.json({ success: true, data: user })
    })
    .catch(_error => {
      res.end('<h1>Bad Request</h1>' + _error)
      // res.json({ success: false, data: _error })
    })
})

/* Resend Confirm Email */
router.get('/user/resend/:id', (req, res, next) => {
  var newrand = Math.floor((Math.random() * 100000) + (Math.random() * 10000) + (Math.random() * 1000) + (Math.random() * 100))
  UsersController.resendEmail(req.params.id, newrand)
    .then(user => {
      link = `${http}://${req.get('host')}/api/users/verify/${user._id}?rand=` + newrand
      var errorSendEmail = sendEmail(user.email, link)
      if (errorSendEmail) {
        return res.json({ errorCode: 'error when send verify email', msg: errorSendEmail })
      }
      return res.json({ success: true, data: user })
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
/*
------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------

-----------------------------------------------------------------------------------
*/
router.post('/cooperative/login', async (req, res, next) => {
  passport.authenticate('logincooperative', async (err, cooperative, info) => {
    try {
      if (err || !cooperative) {
        return res.json({ auth: false, message: info.message })
      }
      req.login(cooperative, { session: false }, async (error) => {
        if (error) return next(error)
        // We don't want to store the sensitive information such as the
        // user password in the token so we pick only the email and id
        const body = { _id: cooperative._id, email: cooperative.email }
        // Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ cooperative: body }, cfg.jwtSecret)
        // Send back the token to the user
        delete cooperative.password
        return res.json({ auth: true, token, id: cooperative._id, email: cooperative.email, info: cooperative })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

/* SAVE cooperative */
router.post('/cooperative/signup', (req, res, next) => {
  let rand = Math.floor((Math.random() * 100000) + (Math.random() * 10000) + (Math.random() * 1000) + (Math.random() * 100))
  CooperativesController.create(req.body, rand)
    .then(cooperative => {
      link = `${http}://${req.get('host')}/api/cooperatives/verify/${cooperative._id}?rand=` + rand
      var errorSendEmail = sendEmail(req.body.email, link)
      if (errorSendEmail) {
        return res.json({ errorCode: 'error when send verify email', msg: errorSendEmail })
      }
      return res.json({ success: true, data: cooperative })
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

/* Change password by Email */
router.post('/cooperative/changepassword', function (req, res) {
  CooperativesController.changePassword(req.body)
    .then(cooperative => res.json({ success: true, data: cooperative }))
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

/* Verify Email */
router.get('/cooperative/verify/:id', function (req, res) {
  CooperativesController.verifyAccount(req.params.id, req.query.rand)
    .then(cooperative => {
      res.end('<h1>Email is been Successfully verified')
      // res.json({ success: true, data: cooperative })
    })
    .catch(_error => {
      res.end('<h1>Bad Request</h1>' + _error)
      // res.json({ success: false, data: _error })
    })
})

/* Resend Confirm Email */
router.get('/cooperative/resend/:id', (req, res, next) => {
  var newrand = Math.floor((Math.random() * 100000) + (Math.random() * 10000) + (Math.random() * 1000) + (Math.random() * 100))
  CooperativesController.resendEmail(req.params.id, newrand)
    .then(cooperative => {
      link = `${http}://${req.get('host')}/api/cooperatives/verify/${cooperative._id}?rand=` + newrand
      var errorSendEmail = sendEmail(cooperative.email, link)
      if (errorSendEmail) {
        return res.json({ errorCode: 'error when send verify email', msg: errorSendEmail })
      }
      return res.json({ success: true, data: cooperative })
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
/*
------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------

-----------------------------------------------------------------------------------
*/
function sendEmail (toEmail, link) {
  var mailOptions = {
    from: 'trieuphong799@gmail.com',
    to: toEmail,
    subject: 'Please confirm your Email account',
    text: 'Hello ' + toEmail + '✔',
    html: 'Hello,<br> Please Click on the link to verify your email.<br><a href=' + link + `>Click here to verify</a>
          <br>
          <h2> Open BS </h2>`,
    bcc: 'trieuphong799@gmail.com'
  }
  var errorSend = ''
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      errorSend = error
    } else {
      // console.log(info)
      errorSend = null
    }
  })
  return errorSend
}
module.exports = router
