require('dotenv/config')
const express = require('express')
const path = require('path')
const app = express();
const bodyParser = require('body-parser')
const yelpRoutes = require('./routes/yelp')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(yelpRoutes)

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})