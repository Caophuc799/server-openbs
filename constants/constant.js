
import nodemailer from 'nodemailer'
require('dotenv').config()

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

export const blockStart = 4382430

export const walletPrivateKey = '0x2732a6fd23cb8477933d37e818a493b4b87e5ead0f5a578f63b14c573c1f9034'

export const walletAddress = '0xc23e221736376daf733F19bA17009F53D71e059a'

export const contractAddress = '0x63f3ae3f3158e03409827b2c754078a68eedc5bf'

