const Game = require('../models/games')
const Player = require('../models/players')
const asyncForEach = require('../util/forEach')


exports.postReserve = async (req, res, next) => {
  const user = req.user
  const players = req.body.players
  const course = req.body.course
  const date = req.body.date
  const totalScores = req.body.totalScores
  console.log(user.id)
  try {
    await asyncForEach(players, async player => {
      await Player
        .findOrCreate({where: {email: player.email, user_id: user.id}, 
          defaults: {
          email: player.email,
          name: player.name,
          aveScore: player.aveScore,
          user_id: user.id
        }})
        .spread((player, created) => {
          if (created) {
            newGame = user
              .createGame({
                course,
                date,
                player_id: player.id,
                total_score: totalScores
              })
            }
          })
      })
  }
  catch(err) {
    console.log(err)
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
    Game.findOne({where: {user_id: user.id, date: date}})
      .then(game => {
        console.log
        return res.status(200).json({
          message: `Course ${course} was scheduled for ${date}`,
          id: game.id
        })
     })
     .catch(err => {
       console.log(err)
     })
  }
