const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Player = sequelize.define('players', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: Sequelize.STRING,
  name: Sequelize.STRING,
  aveScore: Sequelize.INTEGER
})

module.exports = Player