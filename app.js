import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import mongoose from 'mongoose'
import apiRoutes from './routes/api.v1.0.0'

const app = express()

mongoose.Promise = require('bluebird')
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
var verifyEmail = require('email-verification')(mongoose)
mongoose.connect('mongodb://localhost:27017/openbs', { promiseLibrary: require('bluebird') })
  .then(() => console.log('connection mongodb succesful'))
  .catch((err) => console.error(err))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(passport.initialize())
app.use(passport.session())
apiRoutes(app, passport)
// Config verify Email

// verifyEmail.configure({
//   verificationURL: 'http://myawesomewebsite.com/email-verification/${URL}',
//   persistentUserModel: User,
//   tempUserCollection: 'myawesomewebsite_tempusers',

//   transportOptions: {
//     service: 'Gmail',
//     auth: {
//       user: 'myawesomeemail@gmail.com',
//       pass: 'mysupersecretpassword'
//     }
//   },
//   verifyMailOptions: {
//     from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
//     subject: 'Please confirm account',
//     html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
//     text: 'Please confirm your account by clicking the following link: ${URL}'
//   }
// }, function (error, options) {
// })

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888')

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true)

//   // Pass to next layer of middleware
//   next()
// })

app.use(function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// app.get('*', (_req, res) => res.status(200).send({
//   message: 'Welcome to the OpenBS'
// }))
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  err.message = 'Page not found'
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  console.log(err)
  res.json(err.message || 'Page not found')
  res.render('error')
})

module.exports = app
