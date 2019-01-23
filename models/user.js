var mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection)
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types

var User = new Schema(
  {
    firstName: {
      type: SchemaTypes.String,
      required: true
    },
    lastName: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: ''
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
      type: String,
      default: ''
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
  },
  {
    timestamps: true
  }
)

User.plugin(autoIncrement.plugin, { model: 'UserModel', field: 'id' })

User.index({ email: 1 }, { unique: true })

var UserModel = mongoose.model('UserModel', User)

UserModel.createIndexes()

module.exports = UserModel
