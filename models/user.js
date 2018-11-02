var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
// var SchemaTypes = mongoose.Schema.Types

var User = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: true
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
    type: String,
    required: true,
    unique: true
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
    default: false
  },
  rand: {
    type: Number,
    default: 0
  }
})

// MangoTree.index({ name: 2, category: 3 })

var UserModel = mongoose.model('UserModel', User)

module.exports = UserModel
