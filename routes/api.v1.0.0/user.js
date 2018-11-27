import express from 'express'
import UsersController from '../../controllers/UsersController'
import { transporter } from '../../constants/constant'

var rand, link
var http = 'http'
const router = express.Router()

/* GET ALL users */
router.get('/', (req, res, next) => {
  UsersController.getAll({ query: req.query })
    .then(users => res.json({ success: true, data: users }))
    .catch(_error => res.json({ success: false, data: [] }))
})

/* SAVE user */
router.post('/', (req, res, next) => {
  rand = Math.floor((Math.random() * 100000) + (Math.random() * 10000) + (Math.random() * 1000) + (Math.random() * 100))
  UsersController.create(req.body, rand)
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
      return res.json(status, { success: false, data: _error })
    })
})

/* GET SINGLE user BY ID */
router.get('/:id', (req, res, next) => {
  UsersController.getOne(req.params.id)
    .then(user => res.json({ success: true, data: user }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      return res.json(status, { success: false, data: _error })
    })
})

/* UPDATE user */
router.put('/:id', (req, res, next) => {
  UsersController.update(req.params.id, req.body)
    .then(user => res.json({ success: true, data: user }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      return res.json(status, { success: false, data: _error })
    })
})

/* DELETE user */
router.delete('/:id', (req, res, next) => {
  UsersController.delete(req.params.id, req.body)
    .then(user => res.json({ success: true, data: user }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      return res.json(status, { success: false, data: _error })
    })
})

/* Login by Email */
router.post('/login', function (req, res) {
  UsersController.login(req.body)
    .then(user => res.json({ success: true, data: user }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      return res.json(status, { success: false, data: _error })
    })
})

/* Change password by Email */
router.post('/changepassword', function (req, res) {
  UsersController.changePassword(req.body)
    .then(user => res.json({ success: true, data: user }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      return res.json(status, { success: false, data: _error })
    })
})

/* Verify Email */
router.get('/verify/:id', function (req, res) {
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
router.get('/resend/:id', (req, res, next) => {
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
      return res.json(status, { success: false, data: _error })
    })
})

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

export default router
