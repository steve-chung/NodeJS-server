const Sequelize = require('sequelize')
// const decamelize = require('decamelize')
const config = require('../db/config').development

const sequelize = new Sequelize(config)

sequelize.addHook('beforeDefine', (attributes) => {
  Object.keys(attributes).forEach((name) => {
      if (typeof attributes[name] !== 'function') {
          attribute = attributes[name]
          const _underscored = attribute.underscored === undefined ? sequelize.options.define.underscored : attribute.underscored;
          if (attribute.field === undefined && _underscored !== undefined) {
              attribute.field = sequelize.Utils.underscoredIf(name, _underscored);
          }
      }
  })
})

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.')
})
.catch(err => {
  console.error('Unable to connect to the database:', err)
})
module.exports = sequelize