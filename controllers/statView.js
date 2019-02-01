const sequelize = require('../util/database')
const asyncForEach = require('../util/forEach')

exports.getStatView = async (req, res, next) => {
  const user = req.user
  const stat = {}
  const resStat = []
  let dateStat = {}
  const performStat = []
  try {
    const view = await sequelize.query('SELECT * FROM stat_by_date WHERE user_id= :id ORDER BY date ASC',
    { replacements: { id: user.id }, type: sequelize.QueryTypes.SELECT})
    if (!view) {
      return res.status(204).json({
        message: 'The record is empty'
      })
    }
    await asyncForEach(view, async (statHole, index) => {
      let date = statHole.date
      let nextIndex
      if (index > 0 && statHole.date !== view[index-1].date) {
        date = statHole.date
        resStat=[]
      } 
        await asyncForEach(Object.keys(statHole), key => {
          if (key !== 'date' && key !== 'user_id')
            stat[key] = statHole[key]
        })
      resStat.push(stat)
      if (index+1 === view.length){
        nextIndex = index
      } else {
        nextIndex = index + 1
      }
      if (index !== view.length-1 || statHole.date !== view[nextIndex].date || nextIndex === view.length-1){
        dateStat = {
          date: date,
          stats: resStat
        }
      performStat.push(dateStat)  
      }
    })
    return res.status(200).json(performStat)
  } catch(err) {
    console.log(err)
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}
