const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const SCORE = sequelize.define('scores', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  hole_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  stat_id: Sequelize.INTEGER,
  game_id: Sequelize.INTEGER
})

module.exports = SCORE