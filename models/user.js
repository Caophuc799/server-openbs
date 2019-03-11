var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
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
    avatar: { type: String },
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
      default: true
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

User.pre('save', async function (next) {
  // 'this' refers to the current document about to be saved
  const user = this
  // Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  // your application becomes.
  const hash = await bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null)
  // Replace the plain text password with the hash and then store it
  this.password = hash
  // Indicates we're done and moves on to the next middleware
  next()
})

// We'll use this later on to make sure that the user trying to log in has the correct credentials
User.methods.isValidPassword = async function (password) {
  const user = this
  // Hashes the password sent by the user for login and checks if the hashed password stored in the
  // database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

User.plugin(autoIncrement.plugin, { model: 'UserModel', field: 'id' })

User.index({ email: 1 }, { unique: true })

var UserModel = mongoose.model('UserModel', User)

UserModel.createIndexes()

module.exports = UserModel
