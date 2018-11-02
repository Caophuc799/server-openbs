var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types

var User = new Schema({
  firstName: {
    type: SchemaTypes.String,
    required: true
  },
  lastName: String,
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  email: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
    index: true
  },
  phoneNumber: {
    type: String,
    default: null
  },
  address: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  verify: {
    type: Boolean,
    default: false
  },
  rand: {
    type: Number,
    default: 0
  }
})

User.index({ email: 1 }, { unique: true })

var UserModel = mongoose.model('UserModel', User)

UserModel.createIndexes()

module.exports = UserModel
