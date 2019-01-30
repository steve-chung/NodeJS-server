const Hole = require('../models/holes')
const Score = require('../models/score')
const asyncForEach = require('../util/forEach')

exports.postHoles = async (req, res, next) => {
  const holes = req.body.holes
  const gameId = req.body.game_id
  const user = req.user
  let newHoles = []
  await Score.findOne( {where: { user_id: user.id, game_id: gameId }})
    .then((score) => {
      if (score) {
        return {'message': `The hole info already added with the gameid ${score.game_id}`}
      }
    })
  try {
    await asyncForEach(holes, async hole => {
      const newHole = await Hole.create({
        hole_number: Object.keys(hole)[0],
        par: Object.values(hole)[0]
      })
        if (newHole) {
          await user.createScore({
                game_id: gameId,
                hole_id: newHole.id,
                stat_id: null
              })
            newHoles.push({
                holeId: newHole.id,
                holeNumber: newHole.hole_number,
                par: newHole.par
              })
        }
      })
  return res.status(200).json(newHoles)
    }
  catch(err) {
    console.log(err)
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}