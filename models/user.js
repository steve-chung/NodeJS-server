const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const User = sequalize.define('user', {
  id: {
    type: Sequalize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
})

module.exports = User