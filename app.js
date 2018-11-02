import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import mongoose from 'mongoose'
import apiRoutes from './routes/api.v1.0.0'
import { urlMongo, localhosturlMongo } from './constants/constant'
const app = express()

mongoose.Promise = require('bluebird')
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  promiseLibrary: require('bluebird')
}

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect(urlMongo, options).then(() => {
    console.log('MongoDB is connected')
  }).catch(_err => {
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(passport.initialize())
app.use(passport.session())
apiRoutes(app, passport)

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
