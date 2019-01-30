const jwt = require('jsonwebtoken')
const User = require('../models/user')

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  }

  if (token) {
    jwt.verify(token, '123', (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        User.findOne({ where: {email: decoded.user}})
          .then(user => {
            req.user = user
            next()
          })
          .catch( err => {
            console.log(err)
          })
      }
    })
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    })
  }
}

module.exports = {
  checkToken: checkToken
}