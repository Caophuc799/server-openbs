var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var autoIncrement = require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection)
mongoose.Promise = global.Promise

var Schema = mongoose.Schema
var SchemaTypes = mongoose.Schema.Types

var Cooperative = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    taxCode: {
      type: SchemaTypes.String,
      required: true,
      unique: true
    },
    logo: { type: String },
    idRepresentation: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'UserModel'
    },
    email: {
      type: SchemaTypes.String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      longitude: {
        type: String,
        default: ''
      },
      latitude: {
        type: String,
        default: ''
      }
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
    },
    certificateImg: { type: String },
    treeIds: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'TreeModel'
      }
    ]
  },
  {
    timestamps: true
  })
Cooperative.pre('save', async function (next) {
  // 'this' refers to the current document about to be saved
  const cooperative = this
  // Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  // your application becomes.
  const hash = await bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null)
  // Replace the plain text password with the hash and then store it
  this.password = hash
  // Indicates we're done and moves on to the next middleware
  next()
})

// We'll use this later on to make sure that the user trying to log in has the correct credentials
Cooperative.methods.isValidPassword = async function (password) {
  const cooperative = this
  // Hashes the password sent by the user for login and checks if the hashed password stored in the
  // database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, cooperative.password)
  return compare
}
Cooperative.plugin(autoIncrement.plugin, { model: 'CooperativeModel', field: 'id' })
Cooperative.index({ email: 1, taxCode: 1 }, { unique: true })

var CooperativeModel = mongoose.model('CooperativeModel', Cooperative)
CooperativeModel.createIndexes()
module.exports = CooperativeModel
