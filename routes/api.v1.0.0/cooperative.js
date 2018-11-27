import express from 'express'
import CooperativesController from '../../controllers/CooperativesController'
import { transporter } from '../../constants/constant'

var rand, link
var http = 'http'
const router = express.Router()

/* GET ALL cooperatives */
router.get('/', (req, res, next) => {
  CooperativesController.getAll()
    .then(cooperatives => res.json({ success: true, data: cooperatives }))
    .catch(_error => res.json({ success: false, data: [] }))
})

/* SAVE cooperative */
router.post('/', (req, res, next) => {
  rand = Math.floor((Math.random() * 100000) + (Math.random() * 10000) + (Math.random() * 1000) + (Math.random() * 100))
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
      return res.json(status, { success: false, data: _error })
    })
})

/* GET SINGLE cooperative BY ID */
router.get('/:id', (req, res, next) => {
  CooperativesController.getOne(req.params.id)
    .then(cooperative => res.json({ success: true, data: cooperative }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      return res.json(status, { success: false, data: _error })
    })
})

/* UPDATE cooperative */
router.put('/:id', (req, res, next) => {
  CooperativesController.update(req.params.id, req.body)
    .then(cooperative => res.json({ success: true, data: cooperative }))
    .catch(_error => {
      let status = 500
      if (_error.status) {
        status = _error.status
        delete _error.status
      }
      return res.json(status, { success: false, data: _error })
    })
})

/* DELETE cooperative */
router.delete('/:id', (req, res, next) => {
  CooperativesController.delete(req.params.id, req.body)
    .then(cooperative => res.json({ success: true, data: cooperative }))
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
  CooperativesController.login(req.body)
    .then(cooperative => res.json({ success: true, data: cooperative }))
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
  CooperativesController.changePassword(req.body)
    .then(cooperative => res.json({ success: true, data: cooperative }))
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
router.get('/resend/:id', (req, res, next) => {
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
