const express = require('express')
const path = require('path')
const app = express();
const bodyParser = require('body-parser')

const yelpRoutes = require('./routes/yelp')



app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3000, 
  console.log('Server is listening port 3000'))