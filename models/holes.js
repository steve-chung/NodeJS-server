const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Hole = sequelize.define('holes', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  hole_number: Sequelize.INTEGER,
  par:Sequelize.INTEGER,
})

module.exports = Hole