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
  user_id: { type: Sequelize.STRING, field: 'user_id'},
  aveScore: Sequelize.INTEGER
}, { underscored: true })

module.exports = Player