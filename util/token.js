const jwt = require('jsonwebtoken') 
const bcrypt = require('bcryptjs') 

exports.createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    {
      user: user.email,
    },
    secret,
    {
      expiresIn: '10hr',
    },
  )

  const createRefreshToken = jwt.sign(
    {
      user: user.id,
    },
    secret2,
    {
      expiresIn: '7d',
    },
  )

  return Promise.all([createToken, createRefreshToken])
}