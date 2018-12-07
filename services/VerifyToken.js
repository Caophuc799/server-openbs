const jwt = require('jsonwebtoken');


export function verifyToken(req, res, next) {
  // get auth header value
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    // split at the space
    const bearer = bearerHeader.split(' ');
    // get token from array
    const brearerToken = bearer[0];

    jwt.verify(brearerToken, 'secreckey', (err, authData) => {
      if (err) {
        res.sendStatus(403)
      }
      else {
        // next middleware
        next();
      }
    })
  }
  else {
    // Forbidden
    res.sendStatus(403)
  }
}
