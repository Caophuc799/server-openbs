
import nodemailer from 'nodemailer'
require('dotenv').config()
export const STATUS_TREE = {
  AVAILABLE: 'AVAILABLE', // chua co ai mua
  PENDING: 'PENDING', // đã mua, đang chơ thanh toán
  PURCHASED: 'PURCHASED' // đã được mua(đã confirm)
}
export var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'trieuphong799@gmail.com',
    pass: 'Tuoisang'
  }
})

export var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'trieuchanphong799@gmail.com', // Your email id
    pass: 'Tuoisang' // Your password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
})

export const mongoOnline = 'mongodb://openbsTest:openbsTest1@ds249233.mlab.com:49233/openbs_server'
export const mongoLocal = 'mongodb://localhost:27017/openbs'
// mongodb://localhost:27017/openbs

export const BlockStart = 5453669

export const walletPrivateKey = '0x9E37704161B5A72CFA3BC376104E772EC4C1350C44B5E2445A7F30E629A97F16'

export const walletAddress = '0x72D0D2A415ee838aDFda3FD0aD34AF06cCbb4C44'

export const addressSC = '0x0458860c5e95a11e9996f250b382c74a7d0a13bf' // '0x447170c0964c938a3a595cf8bfaf08221405d580'

export const contractAddress = '0x63f3ae3f3158e03409827b2c754078a68eedc5bf'

export const ACTION = {
  CREATE_TREE: 'CREATE_TREE',
  ADD_STATE_TREE: 'ADD_STATE_TREE',
  BUY_TREE: 'BUY_TREE'
}
