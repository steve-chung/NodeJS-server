const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Stat = sequelize.define('stat', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  first_club: Sequelize.STRING,
  first_distance: Sequelize.INTEGER,
  second_club: Sequelize.STRING,
  second_distance: Sequelize.INTEGER,
  stroks_green = Sequelize.INTEGER,
  total_shot = Sequelize.INTEGER,

})
module.exports = Stat