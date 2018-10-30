var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
// var SchemaTypes = mongoose.Schema.Types

var User = new Schema({
  id: String,
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  dateOfBirth: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// MangoTree.index({ name: 2, category: 3 })

var UserModel = mongoose.model('UserModel', User)

module.exports = UserModel
