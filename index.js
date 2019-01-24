require('dotenv/config')
const express = require('express')
const path = require('path')
const app = express();
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/api')
const user = require('./models/user')


app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', apiRoutes)

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})