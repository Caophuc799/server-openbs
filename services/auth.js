const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../models/user')
const CooperativeModel = require('../models/cooperative')
const cfg = require('../config')
const JWTstrategy = require('passport-jwt').Strategy
// We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt
// Create a passport middleware to handle user registration

// Create a passport middleware to handle User login
passport.use('loginuser', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // Find the user associated with the email provided by the user
    const user = await UserModel.findOne({ email })
    if (!user) {
      // If the user isn't found in the database, return a message
      return done(null, false, { message: 'User not found' })
    }
    // Validate password and make sure it matches with the corresponding hash stored in the database
    // If the passwords match, it returns a value of true.
    const validate = await user.isValidPassword(password)
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' })
    }
    // Send the user information to the next middleware
    return done(null, user, { message: 'Logged in Successfully' })
  } catch (error) {
    return done({ auth: false, message: error })
  }
}))

// Create a passport middleware to handle User login logincooperative
passport.use('logincooperative', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // Find the user associated with the email provided by the user
    const cooperative = await CooperativeModel.findOne({ email })
    if (!cooperative) {
      // If the user isn't found in the database, return a message
      return done(null, false, { message: 'cooperative not found' })
    }
    // Validate password and make sure it matches with the corresponding hash stored in the database
    // If the passwords match, it returns a value of true.
    const validate = await cooperative.isValidPassword(password)
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' })
    }
    // Send the user information to the next middleware
    return done(null, cooperative, { message: 'Logged in Successfully' })
  } catch (error) {
    return done({ auth: false, message: error })
  }
}))

// This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
  // secret we used to sign our JWT
  secretOrKey: cfg.jwtSecret,
  // we expect the user to send the token as a query paramater with the name 'secret_token'
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    // Pass the user details to the next middleware
    return done(null, token.user)
  } catch (error) {
    return done({ auth: false, message: error })
  }
}))

module.exports = {
  initialize: function () {
    return passport.initialize()
  },
  authenticate: function () {
    return passport.authenticate('jwt', cfg.jwtSession)
  }
}
