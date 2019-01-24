const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.register = (req, res, next) => {
  const email = req.body.email
  const name = req.body.name
  const notHashedPassword = req.body.password
  const phone = req.body.phone

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(notHashedPassword, salt, function(err, hash) {
      console.log(hash)
      User
        .findOrCreate({where: {email:email}, 
        defaults: {phone, password: hash, name}})
        .spread((user, created) => {
          if (created) {
          return res.status(200).json({
              message:`User ${user.name} was created`,
              id: user.id,
              username: user.name,
            })
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

}

exports.logout = (req, res, next) => {

} 