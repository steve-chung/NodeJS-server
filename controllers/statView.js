const sequelize = require('../util/database')


exports.getStatView = async (req, res, next) => {
  const user = req.user
  console.log('view')
  sequelize.query('SELECT * FROM stat_by_date WHERE user_id= :id ORDER BY date ASC',
    { replacements: { id: user.id }, type: sequelize.QueryTypes.SELECT}
    ).then(view => {
      console.log(view)
    })
}
