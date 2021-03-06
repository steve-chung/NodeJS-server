require('dotenv/config')
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/api')
const authRoutes = require('./routes/auth')
const sequelize = require('./util/database')

const Game = require('./models/games')
const Hole = require('./models/holes')
const User = require('./models/user')
const Player = require('./models/players')
const Score = require('./models/score')
const Stat = require('./models/stat')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json('application/json'))

app.use('/api/auth', authRoutes)
app.use('/api', apiRoutes)

Game.belongsTo(User, { foreignKey: 'user_id', constraints: true, onDelete: 'CASCADE' })
User.hasMany(Game)
Player.belongsTo(User, { foreignKey: 'user_id', constraints: true, onDelete: 'CASCADE' })
User.hasMany(Player)
Score.belongsTo(User, { foreignKey: 'user_id', constraints: true, onDelete: 'CASCADE' })
User.hasMany(Score)
Score.belongsTo(Game, { foreignKey: 'game_id', constraints: true, onDelete: 'CASCADE' })
Score.belongsTo(Hole, { foreignKey: 'hole_id', constraints: true, onDelete: 'CASCADE' })
Score.belongsTo(Stat, { foreignKey: 'stat_id', constraints: true, onDelete: 'CASCADE' })

sequelize
  .sync()
  .then(result => {
    app.listen(process.env.PORT, () => {
      console.log('Listening on port', process.env.PORT)
  })
  })
  .catch(err => {
  console.log(err)
    })