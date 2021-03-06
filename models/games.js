const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Game = sequelize.define('games', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  course: Sequelize.STRING,
  date: Sequelize.DATE,
  player_id: Sequelize.INTEGER,
  total_score: Sequelize.INTEGER
})

module.exports = Game