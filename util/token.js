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

exports.refreshTokens = async (token, refreshToken, models, SECRET, SECRET_2) => {
  let userId = -1;
  try {
    const { user: { id } } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await models.User.findOne({ where: { id: userId }, raw: true });

  if (!user) {
    return {};
  }

  const refreshSecret = SECRET_2 + user.password;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecret);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

