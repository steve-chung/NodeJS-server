const Sequelize = require('sequelize')
require('dotenv/config')

console.log(process.env.USERID)
console.log(process.env.PASSWORD)
const sequelize = new Sequelize('golf-score-tracker', process.env.USERID, process.env.PASSWORD, {
  dialect: 'postgres',
  host:'localhost'
})

.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize