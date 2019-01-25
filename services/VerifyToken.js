// const jwt = require('jsonwebtoken');


// export function verifyToken(req, res, next) {
//   // get auth header value
//   const bearerHeader = req.headers['authorization'];

//   if (typeof bearerHeader !== 'undefined') {
//     // split at the space
//     const bearer = bearerHeader.split(' ');
//     // get token from array
//     const brearerToken = bearer[0];

//     jwt.verify(brearerToken, 'secreckey', (err, authData) => {
//       if (err) {
//         res.sendStatus(403)
//       }
//       else {
//         // next middleware
//         next();
//       }
//     })
//   }
//   else {
//     // Forbidden
//     res.sendStatus(403)
//   }
// }

const jwt = require('jsonwebtoken')
require('dotenv').config()

let requireLogin = (req, res, next) => {
  var token = req.headers.authorization
  if (!token) { return res.status(401).send({ auth: false, message: 'No token provided.' }) }
  jwt.verify(token.replace('Bearer ', ''), process.env.SECRET, (err, decoded) => {
    if (err) { return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }) }
    req.email = decoded.email
    req.role = decoded.role
    next()
  })
}
module.exports = { RequireLogin: requireLogin }
