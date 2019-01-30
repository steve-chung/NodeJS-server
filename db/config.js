require('dotenv').config();

const { Op } = require('sequelize');

module.exports = {
  development: {
    host: 'localhost',
    username: process.env.USERID,
    password: process.env.PASSWORD,
    database: 'golf-score-tracker',
    dialect: 'postgres',
    operatorsAliases: Op,
    define: {
      freezeTableName: true,
      underscored: true,
    },
  },
};