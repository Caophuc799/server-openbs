
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
    user: 'trieuchanphong@gmail.com', // Your email id
    pass: 'Tuoisang' // Your password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
})

export const urlMongo = 'mongodb://openbsTest:openbsTest1@ds249233.mlab.com:49233/openbs_server'
export const localhosturlMongo = 'mongodb://localhost:27017/openbs'
// mongodb://localhost:27017/openbs
