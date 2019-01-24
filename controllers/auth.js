const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.register = (req, res, next) => {
  const email = req.body.email
  const name = req.body.name
  const password = req.body.password
  const phone = req.body.phone

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      User.creat({
        name,
        email,
        phone,
        password: hash
      })
      .then(() => User.findOrCreate({where: {email:email}}))
      .spread((user, created) => {
        if (!created) {
          return res.status(400).json({
            message:`User ${name} is already exist, please use different name`
          })
        }
        res.status(200).json({
          message:`User ${user.name} was created`,
          id: user.id,
          username: user.name,
        })
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
