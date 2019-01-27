const User = require('../models/user')
const RevokedToken = require('../models/revokedToken')
const { createTokens } = require('../util/token')
const bcrypt = require('bcryptjs')


const loginRes = (user, res) => {
  let accessToken
  let refreshToken
  createTokens(user, '123', '654')
    .then((tokens) => {
      accessToken = tokens[0]
      refreshToken = tokens[1]
      return res.status(200).json({
        message:`User ${user.name} was created`,
        id: user.id,
        username: user.name,
        accessToken,
        refreshToken
      })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.register = (req, res, next) => {
  const email = req.body.email
  const name = req.body.name
  const notHashedPassword = req.body.password
  const phone = req.body.phone

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(notHashedPassword, salt, function(err, hash) {
      User
        .findOrCreate({where: {email:email}, 
        defaults: {phone, password: hash, name}})
        .spread((user, created) => {
          if (created) {
              return loginRes(user, res)
            } else {
              return res.status(400).json({
                message:`User ${name} is already exist, please use different name`
              })
            }
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({
            message:'Something went wrong'
          })
        })
    })
  })
}

exports.login = (req, res, next) => {
  const email = req.body.email
  console.log(email)
  const password = req.body.password
  User.findOne({ where: { email }, raw: true })
    .then (user => {
      console.log(user)
      if (!user) {
        // user with provided email not found
        throw new Error('Invalid login');
      }
      console.log(user.password)
      bcrypt.compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            throw new Error('Invalid login');
          }else {
            loginRes(user, res)
          }
        })
        .catch(err => {
          console.log(err)
          return res.status(400).json({
            message: 'Invalid login'
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message:'Something went wrong'
      })
    })
}


exports.logout = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  console.log(token)
  RevokedToken
    .findOrCreate({where: {jti: token}, 
      defaults: {jti: token}})
      .spread((token, created) => {
        if (created) {
          return res.status(200).json({
            message: 'Successfully logged out'
          })
        } 
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message:'Something went wrong'
        })
      })
}   