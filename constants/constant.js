
import nodemailer from 'nodemailer'
require('dotenv').config()

export var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'trieuphong799@gmail.com',
    pass: 'Tuoisang'
  }
})

export const urlMongo = 'mongodb://openbsTest:openbsTest1@ds249233.mlab.com:49233/openbs_server'
export const localhosturlMongo = 'mongodb://localhost:27017/openbs'
// mongodb://localhost:27017/openbs