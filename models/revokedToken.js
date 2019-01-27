const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const RevokedToken = sequelize.define('revoked_tokens', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  jti: Sequelize.STRING,
})

module.exports = RevokedToken