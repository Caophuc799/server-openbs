import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import mongoose from 'mongoose'
import apiRoutes from './routes/api.v1.0.0'
import { blockStart, mongoLocal, mongoOnline, walletAddress, contractAddress, walletPrivateKey } from './constants/constant'
import { createData, removeData } from './seedData'
import Firebase from './services/Firebase'
import fileUpload from 'express-fileupload'
import OpenBS from './contracts/Contract'

const cors = require('cors')

require('./services/auth')
// Etherium
var web3 = require('./services/web3')
var TokenOpenBS = require('./services/TokenOpenBS')
Firebase.init()
const app = express()
mongoose.Promise = require('bluebird')
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)

/* Kieu connect mongo khac */
// mongoose.connect(localhosturlMongo, { promiseLibrary: require('bluebird') })
//   .then(() => console.log('connection mongodb succesful'))
//   .catch((err) => console.error(err))

/* Kieu connect mongo khac */
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
  mongoose.connect(mongoLocal, options).then(() => {
    console.log('MongoDB is connected')
    // mongoose.connection.db.dropDatabase()
  }).catch(_err => {
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}
connectWithRetry()

app.use(cors())
// upload file
app.use(fileUpload())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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
// seedData()
async function seedData () {
  // remove data
  await removeData()
  await createData()
}

// setupListenEventSmartContract()
// setInterval(pingInfura, 3000)

var na = 0

function pingInfura () {
  web3.eth.getBlockNumber().then(console.log)
  if (na === 0) {
    tempat()
    na += 1
  } else {
    na += 1
  }
}

async function tempat () {
  let accountEther = await web3.eth.accounts.privateKeyToAccount(walletPrivateKey)
  await web3.eth.accounts.wallet.add(accountEther)
  // let ta = await web3.eth.accounts.wallet.encrypt('123abc')
  // console.log(ta)
  // web3.eth.accounts.wallet.save('123abc')
  // web3.eth.defaultAccount = accountEther.address
  // console.log(web3.eth.privateKeyToAccount(walletPrivateKey))
  // var transfer = TokenOpenBS.methods.mintUniqueTokenTo('0xc23e221736376daf733F19bA17009F53D71e059a', 2, 'TOT 2')
  //   // .call({ from: '0xc23e221736376daf733F19bA17009F53D71e059a' || 0x541a359c4651E4C64C463059E5f9a30769827f82, gas: 50000000 })
  //   // .then((result) => {
  //   //   console.log(result)
  //   // })
  //   // .catch(error => console.log(error))
  // var encodedABI = transfer.encodeABI()

  // var tx = {
  //   from: walletAddress,
  //   to: contractAddress,
  //   gas: 5000000,
  //   data: encodedABI
  // }

  // web3.eth.accounts.signTransaction(tx, walletPrivateKey).then(signed => {
  //   var tran = web3.eth.sendSignedTransaction(signed.rawTransaction)

  //   tran.on('confirmation', (confirmationNumber, receipt) => {
  //     console.log('confirmation: ' + confirmationNumber)
  //   })

  //   tran.on('transactionHash', hash => {
  //     console.log('hash')
  //     console.log(hash)
  //   })

  //   tran.on('receipt', receipt => {
  //     console.log('reciept')
  //     console.log(receipt)
  //   })

  //   tran.on('error', console.error)
  // })
}

function setupListenEventSmartContract () {
  console.log('setupListenEventSmartContract')
  TokenOpenBS.getPastEvents('allEvents', { // Using an array means OR: e.g. 20 or 23
    fromBlock: blockStart,
    toBlock: 'latest'
  }, function (error, events) {
    if (error) return console.log('Error: 176: ', error)
    console.log('events')
  })
}

module.exports = app
