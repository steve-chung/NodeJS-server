const Stat = require('../models/stat')
const asyncForEach = require('../util/forEach')
const Score = require('../models/score')
const Game = require('../models/games')




exports.postStat = async (req, res, next) => {
  const user = req.user
  const gameId = req.body.game_id
  const holeId = req.body.hole_id
  
  const foundScore = await Score.findOne({where: {hole_id: holeId, game_id: gameId}})
  if (foundScore.stat_id) {
    return res.status(500).json({
      message: `Stat ${foundScore.stat_id}`
    })
  }
  try {
    const firstClub = req.body.firstClub
    const firstDistance = req.body.firstDistance
    const secondClub = req.body.secondClub
    const secondDistance = req.body.secondDistance
    const stroksGreen = req.body.stroksGreen
    const totalShots = req.body.totalShots
    const totalScore = req.body.totalScore
    await Game.findOne({ where: { id: gameId }})
      .then(newGame => {
        newGame.total_score = totalScore
        newGame.save()
      })
    await Stat.create({
      first_club: firstClub,
      first_distance: firstDistance,
      second_club: secondClub,
      second_distance: secondDistance,
      stroks_green: stroksGreen,
      total_shot: totalShots
    })
      .then(stat => {
        console.log(stat)
        Score.findOne({where: { user_id: user.id, game_id: gameId, hole_id: holeId }}) 
          .then(newScore => { 
            newScore.update({stat_id: stat.id})
            .then(newScore => {
              return res.status(200).json({
                message: `Successfully add a hole ${newScore.hole_id}`,
                stat_id: newScore.stat_id,
                firstClub,
                firstDistance,
                secondClub,
                secondDistance,
                stroksGreen,
                totalShots,
                totalScore
              })
          })
        })
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json({
        message: 'Something went wrong'
        })
      })
  }
  catch(err) {
    console.log(err)
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
} 

exports.getStat = async (req, res, next) => {
  
}

exports.putStat = async (req, res, next) => {
  const statId = req.params.id
  const gameId = req.body.game_id
  const firstClub = req.body.firstClub
  const firstDistance = req.body.firstDistance
  const secondClub = req.body.secondClub
  const secondDistance = req.body.secondDistance
  const stroksGreen = req.body.stroksGreen
  const totalShots = req.body.totalShots
  const totalScore = req.body.totalScore
  try {
    await Game.findOne({ where: { id: gameId }})
    .then(newGame => {
      newGame.total_score = totalScore
      newGame.save()
    })
    await Stat.findOne({where: {id: statId}})
      .then(stat => {
        stat.first_club = firstClub
        stat.first_distance = firstDistance
        stat.second_club = secondClub
        stat.second_distance = secondDistance
        stat.stroks_green = stroksGreen
        stat.total_shot = totalShots
        stat.save()
        .then(newStat => {
          return res.status(200).json({
            message: `Successfully updated a stat ${newStat.id}`
          })
        })
      })
  }
  catch(err) {
    console.log(err)
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}